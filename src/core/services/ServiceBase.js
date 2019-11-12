import memoryCacheManager from '../cache/MemoryCacheManager';
import fiintradeDb from '../IndexedDB';
import { getLanguage } from './../../component/helpers/Language';

export default class ServiceBase {
  getData = promiseAction => {
    return promiseAction().then(response => {
      if (!response || response.status === 204) {
        return {};
      }
      return response.data;
    });
  };

  applyMemoryCache = (
    key,
    params,
    absoluteExpireTime,
    slidingExpireTimeInMinute,
    removeCallback,
  ) => promiseAction => {
    const cacheKey = this.getCachekey(key, params);

    const cacheItem = memoryCacheManager.get(cacheKey);
    if (cacheItem) {
      return new Promise((resolve, reject) => resolve(cacheItem));
    }

    return promiseAction().then(response => {
      if (!response || response.status === 204) {
        return {};
      }
      const data = response.data;
      memoryCacheManager.add(
        cacheKey,
        data,
        absoluteExpireTime,
        slidingExpireTimeInMinute,
        removeCallback,
      );
      return data;
    });
  };

  applySessionStorageCache = (
    key,
    params,
    absoluteExpireTime,
    slidingExpireTimeInMinute,
    removeCallback,
  ) => promiseAction => {};

  applyLocalStorageCache = (
    key,
    params,
    absoluteExpireTime,
    slidingExpireTimeInMinute,
    removeCallback,
  ) => promiseAction => {};

  //query is a function to query data from indexedDb,
  //by default, it get an item by key which is the first prop of params object
  useIndexedDB = (
    promis,
    params,
    storeName,
    query = (db, storeName, params) =>
      db.get(storeName, params[Object.keys(params)[0]]),
    isExpired = data => true,
    fallback = this.applyMemoryCache(),
  ) => {
    try {
      query(fiintradeDb, storeName, params).then(res => {
        if (res || (Array.isArray(res) && res.length > 0)) {
          if (!isExpired(res)) {
            return new Promise((resolve, reject) => resolve(res));
          }
        }

        return promis.then(response => {
          const result = response.json();
          if (Array.isArray(result)) {
            fiintradeDb.upsertMany(storeName, result);
          } else {
            fiintradeDb.upsert(storeName, result);
          }
          return result;
        });
      });
    } catch (e) {
      if (e.message === 'not supported') {
        fallback(promis, params);
      }
    }
  };

  getCachekey(key, params) {
    let cacheKey = key;

    cacheKey += JSON.stringify(this.formatParams(params)).replace(
      /[}{'.":]/g,
      '',
    );

    return cacheKey;
  }

  formatParams = params => {
    return { ...params, lang: getLanguage() };
  };
}
