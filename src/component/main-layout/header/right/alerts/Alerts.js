import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useAlert } from 'react-alert';
const Alerts = props => {
  clickAlert(props.content);
  return '';
};
const clickAlert = content => {
  //TODO modified const alert = useAlert();
  const KEY_PREV_DELAY = 'PrevDelay';
  let delay = parseInt(localStorage.getItem(KEY_PREV_DELAY));
  setTimeout(
    function() {
      //TODO modified alert.show(content);
    }.bind(this),
    delay,
  );
};
const mapDispatchToProps = {};

export default connect(
  null,
  mapDispatchToProps,
)(Alerts);
