import React, { Component } from "react";
import authProvider from '../../../../core/AuthenticationProvider';

class Logout extends Component {

  logout = () => {
    authProvider.signout();
  };

  render() {
    return (
      <div className="logout-link">
        <a href="javascript:void(0)" onClick={this.logout}>
          <span className="bg-bor-sp">
            <i className="icon-log-out"/>
          </span>
        </a>
      </div>
    );
  }

}

export default Logout;
