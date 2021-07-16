import React, {ReactNode} from "react";
import PropTypes from "prop-types";

interface PropTypes {
  loaded: boolean;
  error?: string;
  children: ReactNode;
}

export default class Loading extends React.Component<PropTypes> {
  public static displayName = "Loading";
  public static propTypes = {
    loaded: PropTypes.bool,
    error: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  public static defaultProps = {
    loaded: false,
    error: undefined,
  };

  public render(): ReactNode {
    if (this.props.error) {
      return <div className="loading error">
        <span>{this.props.error}</span>
      </div>;
    }
    if (this.props.loaded) {
      return this.props.children;
    }
    return <div className="loading">
      <span>Loading…</span>
    </div>;
  }
}
