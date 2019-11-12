import React, { Component } from 'react';
import MainLayout from './../main-layout';
import { I18n } from 'react-redux-i18n';
import authProvider from './../../core/AuthenticationProvider';
import { setUserInfo } from '../app/reducer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



class SignInCallBack extends Component {
  componentDidMount() {
      //const listComponentTitle = I18n.t('common.listComponent');

      }

  render() {
    return (
        <div>
          <h1> SignInCallBack </h1>
        </div>
      );
  }
}


export default connect(
  null,
  null,
)(SignInCallBack);
