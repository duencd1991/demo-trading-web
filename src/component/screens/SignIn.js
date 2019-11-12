import React, { Component } from 'react';
import authProvider from './../../core/AuthenticationProvider';

class SignIn extends Component {
  constructor(props) {
    super(props);
    // authProvider.signout();
    // authProvider.getUser().then(user => {
    //   if (user && !user.expired) {
    //     window.location = '/desktop';
    //   }
    // });
    window.location = '/desktop';
  }

  login = () => {
    authProvider.signin();
  };

  render() {
    return (
      <div>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

export default SignIn;
