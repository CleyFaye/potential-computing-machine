import React, {ReactNode} from "react";
import PropTypes from "prop-types";
import Webcam from "react-webcam";

interface PropTypes {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export default class CameraSetup extends React.Component<PropTypes> {
  public static displayName = "CameraSetup";
  public static propTypes = {
    top: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
  };

  public render(): ReactNode {
    const topBottomSides = {
      left: `${this.props.left}%`,
      right: `${this.props.right}%`,
    };
    const leftRightSides = {
      top: "0px",
      bottom: "0px",
    };
    const topStyle = {
      ...topBottomSides,
      top: "0px",
      height: `${this.props.top}%`,
    };
    const bottomStyle = {
      ...topBottomSides,
      bottom: "0px",
      height: `${this.props.bottom}%`,
    };
    const leftStyle = {
      ...leftRightSides,
      left: "0px",
      width: `${this.props.left}%`,
    };
    const rightStyle = {
      ...leftRightSides,
      right: "0px",
      width: `${this.props.right}%`,
    };
    return <div className="cameraSetup">
      <Webcam />
      <div className="leftCropMargin" style={leftStyle} />
      <div className="rightCropMargin" style={rightStyle} />
      <div className="topCropMargin" style={topStyle} />
      <div className="bottomCropMargin" style={bottomStyle} />
    </div>;
  }
}
