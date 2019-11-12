import React, { Component } from "react";

class AccountInfo extends Component {

  render() {
    return (
      <div className="fiidropdown right account-info">
        <a href="javascript:void(0)" className="">
          <span className="bg-bor-sp">
            <i className="icon-user1"/>
            <span className="notifi-dot"/>
          </span>
          <small>Premium Account</small>
        </a>
        <ul className="dropdown-nav caret">
          <li><a href="javascript:void(0)">Sub link account</a></li>
          <li><a href="javascript:void(0)">Sub link account</a></li>
          <li><a href="javascript:void(0)">Sub link account</a></li>
        </ul>
      </div>
    );
  }

}

export default AccountInfo;
