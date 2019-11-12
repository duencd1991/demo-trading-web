import CacheManager from './CacheManager';
import CacheItem from './CacheItem';

class MemoryCacheManager extends CacheManager {
  cache = [];

  constructor() {
    super();

    //make this sealed
    if (new.target !== MemoryCacheManager) {
      throw new TypeError(
        'This is a sealed class. Subclassing is not allowed.',
      );
    }
  }

  add(
    key,
    value,
    absoluteExpireTime,
    slidingExpireTimeInMinute,
    removeCallback,
  ) {
    this.cache[key] = new CacheItem(
      value,
      absoluteExpireTime,
      slidingExpireTimeInMinute,
      removeCallback,
    );
  }

  get(key) {
    Object.keys(this.cache).forEach(k => {
      if (this.cache[k].isExpired()) {
        this.remove(k);
      }
    });
    let cacheItem = this.cache[key];
    if (
      cacheItem &&
      !cacheItem.absoluteExpireTime &&
      cacheItem.slidingExpireTimeInMinute
    ) {
      cacheItem.updateExpireTime();
    }

    return cacheItem ? cacheItem.value : null;
  }

  remove(key) {
    delete this.cache[key];
  }

  containsKey(key) {
    return this.cache[key];
  }

  flush() {
    delete this.cache;
    this.cache = [];
  }
}

const memoryCacheManager = new MemoryCacheManager();

export default memoryCacheManager;
