export default class CacheItem {
    constructor(value, absoluteExpireTime, slidingExpireTimeInMinute, removeCallback) {
        this.value = value;
        this.absoluteExpireTime = absoluteExpireTime;
        this.slidingExpireTimeInMinute = slidingExpireTimeInMinute;
        this.removeCallback = removeCallback;
        
        const curTime = new Date().getTime();
        if(absoluteExpireTime) {
            this.expireTime = absoluteExpireTime.getTime();
        }
        else if(this.slidingExpireTimeInMinute) {
            this.expireTime = curTime + this.slidingExpireTimeInMinute * 60000;
        }
        else {
            //default add to cache 15mins            
            this.absoluteExpireTime = new Date(curTime);
            this.expireTime = curTime + 0.5 * 60000;
        }
    }

    isExpired() {
        return this.expireTime <= new Date().getTime();
    }

    updateExpireTime() {
        this.expireTime = new Date().getTime() + this.slidingExpireTimeInMinute * 60000;
    }
}