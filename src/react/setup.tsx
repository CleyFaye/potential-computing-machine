import React, {ReactNode} from "react";
import CameraSetup from "./setup/camerasetup.js";

export default class Setup extends React.Component {
  public static displayName = "Setup";

  public render(): ReactNode {
    return <div className="setupPage">
      <div className="leftPane">
        Settings
      </div>
      <div className="rightPane">
        <CameraSetup top={5} bottom={10} left={15} right={20} />
      </div>
    </div>;
  }
}
