import axios from 'axios';

const debug = false;

class Interval  {
  // interval
  // cancel
  constructor(key){
    this.key = key;
  }
  fetch (dispatch, funcGetData, funcResponseData, wait = 1000 * 60 * 10) {
    this.cancel = () => {
      if (this.source) {
        debug && console.log('CANCEL token of key: ', this.key, ': ', this.source);
        this.source.cancel();
      }
      clearInterval(this.interval);
      this.interval = null;
    }

    let fetch = () => {
      this.source = axios.CancelToken.source();//create token for calling api by axios.

      debug && console.log('create token for key: ', this.key, ': ', this.source);
      this.source && funcGetData(this.source).then(response => {
        if (this.interval != null){
          debug && console.log('response ', this.key, ' : ', response)
          funcResponseData(response);
        }
      });
    }
    dispatch(this.cancel)
    fetch();
    this.interval = setInterval(fetch, wait)
  }
}

class ListInterval {
  arr={}

  /**
   * Show current interval list
   */
  showCurrentIntervals(){
    let list = [];
    for(var propertyName in this.arr){
      list.push(propertyName);
    }
    debug && console.log('interval key list: ', list);
    return list;
  }

  /**
   * set interval funtion by Key
   * @param {*} key unique key for each layout
   * @param {*} dispatch of redux
   * @param {Promise} funcGetData param: source (if use axios to cancel calling api) , return a promise (get data or ..)
   * @param {Function} funcResponseData resolve of promise
   * @param {Number} waitTime interval time
   */
  fetch(key, dispatch, funcGetData, funcResponseData, waitTime){
    if (this.arr[key] != null){
      this.arr[key].cancel('cancel call api by key: ', key);
    }

    //init interval
    var interval = new Interval(key);

    //fetch data interval
    interval.fetch(dispatch, funcGetData, funcResponseData, waitTime);

    //add to list
    this.arr[key] = interval;
  }

  /**
   * Clear Interval by Key
   * @param {*} key
   */
  cancel(key){
    if (this.arr[key] != null){
      debug && console.log('cancel key: ', key)
      this.arr[key].cancel();
      delete this.arr[key];
    }
  }
}

export default new ListInterval();
