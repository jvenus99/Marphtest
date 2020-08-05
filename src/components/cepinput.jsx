import React, { Component } from "react";
import Input from "./input";



export const cepMask = value => {
    return value.replace(/\D/g, "");
  };
  
  class CepInput extends Component {
    constructor(props) {
      super(props);
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      event.target.value = cepMask(event.target.value);
  
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
  
  export default CepInput;