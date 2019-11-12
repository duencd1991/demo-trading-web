export default class CacheManager {
    constructor() {
        if(new.target === CacheManager) {
            throw new TypeError("This is an abstract class. Can not construct its instances directly.")
        }

        if(this.add === undefined || this.get === undefined || this.remove === undefined || this.containsKey === undefined) {
            throw new TypeError("This is an abstract class. Must override all its methods.")
        }
    }

    add(key, value, absoluteExpireTime, slidingExpireTimeInMinute, removeCallback) {
    }

    get(key) {
    }

    remove(key) {
    }

    containsKey(key) {
    }
}