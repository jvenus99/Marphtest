import React, { Component } from "react";

class TextArea extends Component {
  render() {
    return (
      <textarea
        name={this.props.name}
        value={this.props.value}
        onChange={this.props.onChange}
        rows="5"
      />
    );
  }
}

export default TextArea;
