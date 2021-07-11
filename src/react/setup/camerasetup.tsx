import React, {ReactNode} from "react";
import Webcam from "react-webcam";

export default class CameraSetup extends React.Component {
  public static displayName = "CameraSetup";

  public render(): ReactNode {
    return <Webcam />;
  }
}
