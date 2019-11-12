// const IdentityServerConfig = {
//     authority: "http://localhost:5000/",
//     client_id: "StoxPlus.FiinTrade.SPA",
//     client_secret: "fiintrade!@#SPA",
//     redirect_uri: window.location.origin + "/signin-callback",
//     post_logout_redirect_uri: window.location.origin + "/",

//     // if we choose to use popup window instead for logins
//     popup_redirect_uri: window.location.origin + "/signin-popup",
//     popupWindowFeatures: "menubar=yes,location=yes,toolbar=yes,width=1200,height=800,left=100,top=100;resizable=yes",

//     // these two will be done dynamically from the buttons clicked, but are
//     // needed if you want to use the silent_renew
//     response_type: "id_token token",
//     scope: "openid FiinTrade.Market FiinTrade.Core FiinTrade.Realtime",

//     // this will toggle if profile endpoint is used
//     loadUserInfo: true,

//     // silent renew will get a new access_token via an iframe
//     // just prior to the old access_token expiring (60 seconds prior)
//     silent_redirect_uri: window.location.origin + "/silent.html",
//     automaticSilentRenew: true,

//     // will revoke (reference) access tokens at logout time
//     revokeAccessTokenOnSignout: true,

//     // this will allow all the OIDC protocol claims to be visible in the window. normally a client app
//     // wouldn't care about them or want them taking up space
//     filterProtocolClaims: false
// }

import { WebStorageStateStore } from 'oidc-client';

const IdentityServerConfig = {
  authority: 'http://42.112.22.11:9999/',
  client_id: 'StoxPlus.FiinTrade.UAT.SPA',
  client_secret: 'fiintrade!@#SPA',
  redirect_uri: window.location.origin + '/signin-callback',
  post_logout_redirect_uri: window.location.origin + '/',

  // if we choose to use popup window instead for logins
  popup_redirect_uri: window.location.origin + '/signin-popup',
  popupWindowFeatures:
    'menubar=yes,location=yes,toolbar=yes,width=1200,height=800,left=100,top=100;resizable=yes',

  // these two will be done dynamically from the buttons clicked, but are
  // needed if you want to use the silent_renew
  response_type: 'id_token token',
  scope: 'openid FiinTrade.Market FiinTrade.Core FiinTrade.Realtime',

  // this will toggle if profile endpoint is used
  loadUserInfo: true,

  // silent renew will get a new access_token via an iframe
  // just prior to the old access_token expiring (60 seconds prior)
  silent_redirect_uri: window.location.origin + '/silent.html',
  automaticSilentRenew: true,

  // will revoke (reference) access tokens at logout time
  revokeAccessTokenOnSignout: true,

  // this will allow all the OIDC protocol claims to be visible in the window. normally a client app
  // wouldn't care about them or want them taking up space
  filterProtocolClaims: false,

  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

export default IdentityServerConfig;
