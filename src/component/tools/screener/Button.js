import React, { Component } from "react";
import { Translate } from 'react-redux-i18n';
class Button extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      buttonClass: "btn btn-cus-nomal bg-b-color-3"
    };
    this.handleButtonPress = this.handleButtonPress.bind(this)
    this.handleButtonUp = this.handleButtonUp.bind(this)
  }

  handleButtonPress() {
    this.setState({ buttonClass: "active btn btn-cus-nomal bg-b-color-3" })
  }

  handleButtonUp() {
    this.setState({ buttonClass: "btn btn-cus-nomal bg-b-color-3" })
  }

  render() {
    const { buttonName, onClick } = this.props;

    return (
      <div
        onMouseDown={this.handleButtonPress}
        onMouseUp={this.handleButtonUp}
        className={this.state.buttonClass}
        onClick={onClick}
      >
        <Translate value={buttonName} />
      </div>
    )
  }
}

export default Button
