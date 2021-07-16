import React, {ReactNode} from "react";
import {Config} from "../shared/types.js";
import {get} from "./services/config.js";
import CameraSetup from "./setup/camerasetup.js";
import Loading from "./components/loading.js";

interface State {
  cameraTop: number;
  cameraBottom: number;
  cameraLeft: number;
  cameraRight: number;
  remoteConfig?: Config;
  error?: string;
}

export default class Setup extends React.Component<Record<string, never>, State> {
  public static displayName = "Setup";

  public constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      cameraTop: 0,
      cameraBottom: 0,
      cameraLeft: 0,
      cameraRight: 0,
    };
  }

  public componentDidMount(): void {
    this.catchPromise(this.loadConfig());
  }

  public render(): ReactNode {
    return <Loading
      loaded={Boolean(this.state.remoteConfig)}
      error={this.state.error}
    >
      <div className="setupPage">
        <div className="leftPane">
          Settings
        </div>
        <div className="rightPane">
          <CameraSetup
            top={this.state.cameraTop}
            bottom={this.state.cameraBottom}
            left={this.state.cameraLeft}
            right={this.state.cameraRight}
          />
        </div>
      </div>
    </Loading>;
  }

  private async loadConfig(): Promise<void> {
    const config = await get();
    this.setState({
      remoteConfig: config,
      cameraTop: config.cameraCrop.top,
      cameraBottom: config.cameraCrop.bottom,
      cameraLeft: config.cameraCrop.left,
      cameraRight: config.cameraCrop.right,
    });
  }

  private catchPromise(promise: Promise<void>): void {
    promise.catch((error: Error) => this.setState({error: error.toString()}));
  }
}
