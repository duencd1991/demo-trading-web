import IdentityServerConfig from '../configs/IdentityServerConfig';
import { UserManager } from 'oidc-client';

class AuthenticationProvider {
  _usrMgr;
  constructor(config) {
    this._usrMgr = new UserManager(IdentityServerConfig);

    let me = this;
    this._usrMgr.events.addSilentRenewError(function(e) {
      console.log('silent renew error: ' + e.message);
      me._usrMgr.getUser().then(user => {
        if (!user || user.expired) {
          alert('Your login session is expired! Please login again.');
          window.location.href = '/';
        }
      });
    });

    //this event is not valid - different from oidc-client homepage
    // this._usrMgr.events.accessTokenExpired(function(e) {
    //     this._usrMgr.getUser().then(user => {
    //         if(!user || user.expired) {
    //             alert('Your login session is expired! Please login again.');
    //             window.location.href = '/';
    //         }
    //     });
    // })

    this._usrMgr.events.addUserSessionChanged(user => {
      console.log('fire');
    });

    // if(window.location.hash) {
    //     this._usrMgr.signinRedirectCallback().then(user => {
    //         window.location = "/desktop";
    //     });
    // }
  }

  getStoreKey() {
    return `user:${IdentityServerConfig.authority}:${
      IdentityServerConfig.client_id
    }`;
  }

  getUser() {
    return this._usrMgr.getUser();
  }

  signin() {
    this._usrMgr.signinRedirect();
  }

  signinCallback() {
    return this._usrMgr.signinRedirectCallback();
  }

  signout() {
    return this._usrMgr.signoutRedirect();
  }

  signinSilentCallback() {
    return this._usrMgr.signinSilentCallback();
  }

  signinSilent() {
    return this._usrMgr.signinSilent();
  }

  signinPopup() {
    return this._usrMgr.signinPopup();
  }
}

const authProvider = new AuthenticationProvider(IdentityServerConfig);

export default authProvider;
