import authProvider from '../AuthenticationProvider';
import axios from 'axios';
import { getLanguage } from './../../component/helpers/Language';

axios.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error).catch(error => {
      if (error.response && error.response.status === 401) {
        // need to remove init requests from app, should place them in desktop didmount
        console.log('unauthorized!');
        // alert('Your login session is expired! Please login again.');
        // window.location.href = '/';
      }
    });
  },
);

export default class ProxyBase {
  baseServiceUrl = '';

  constructor(url) {
    this.baseServiceUrl = url;
  }

  //return a promise
  get(methodName, data, source) {
    const url = this.baseServiceUrl + methodName;
    const config = {
      params: {
        ...data,
        language: getLanguage(),
      },
    };
    if (source) {
      config.cancelToken = source.token;
    }

    return authProvider.getUser().then(user => {
      //TODO add authorization axios.defaults.headers.common.Authorization = `Bearer ${
      //   user ? user.access_token : ''
      // }`;

      return axios.get(url, config);
    });
  }

  post(path, data, config = {}) {
    return authProvider.getUser().then(user => {
      axios.defaults.headers.common.Authorization = `Bearer ${
        user ? user.access_token : ''
      }`;

      return axios.post(`${this.baseServiceUrl}${path}`, data, config);
    });
  }
}
