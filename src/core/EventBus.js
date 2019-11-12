export default class EventBus {
    chanels = [];

    subscribe(chanel, action) {
        if (!this.chanels[chanel]) {
            this.chanels[chanel] = [];
        }
        this.chanels[chanel].push(action);
    }

    unsubscribe(chanel, action) {
        if (this.chanels[chanel]) {
            this.chanels[chanel] = this.chanels[chanel].filter(a => a !== action);
        }
    }

    publish(chanel, data) {
        if (this.chanels[chanel]) {
            this.chanels[chanel].forEach(action => {
                action(data);
            });
        }
    }
}