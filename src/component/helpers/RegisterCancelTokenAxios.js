import axios from 'axios';

class RegisterCancelTokenAxios {
  listSourceByReducerName = {};

  register(reducerName) {
    const source = axios.CancelToken.source();
    this.add(source, reducerName);
    return source;
  }

  add(source, reducerName) {
    if (this.listSourceByReducerName[reducerName]) {
      this.listSourceByReducerName[reducerName].push(source);
    } else {
      this.listSourceByReducerName[reducerName] = [source];
    }
  }

  delete(reducerName) {
    if (this.listSourceByReducerName[reducerName]) {

      this.listSourceByReducerName[reducerName].forEach(source => {
        source.cancel();
      });
      delete this.listSourceByReducerName[reducerName];
    }
  }

  deleteAll() {
  }
}

export default new RegisterCancelTokenAxios();
