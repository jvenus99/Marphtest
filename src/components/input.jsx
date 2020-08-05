import React, { Component } from "react";

class Input extends Component {
  render() {
    return (
      <input
        id={this.props.name}
        name={this.props.name}
        type={this.props.type}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

Input.defaultProps = {
  type: "text"
};

export default Input;
