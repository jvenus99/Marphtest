import React, { Component } from "react";
import Input from "./input";

export const phoneMask = value => {
  return value.replace(/\D/g, "");
};

class PhoneInput extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.target.value = phoneMask(event.target.value);

    this.props.onChange(event);
  }

  render() {
    return (
      <Input
        name={this.props.name}
        value={this.props.value}
        onChange={e => this.handleChange(e)}
      />
    );
  }
}

export default PhoneInput;