import React, {ReactNode} from "react";
import Kiosk from "./kiosk.js";
import Setup from "./setup.js";

interface State {
  setupDone: boolean;
}

export default class App extends React.Component<Record<string, never>, State> {
  public static displayName = "App";

  public constructor(props: Record<string, never>) {
    super(props);
    this.state = {setupDone: false};
  }

  public render(): ReactNode {
    if (this.state.setupDone) {
      return <Kiosk />;
    }
    return <Setup />;
  }
}
