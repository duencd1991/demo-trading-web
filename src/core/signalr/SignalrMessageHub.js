///////////////////////////////////////////////////
// Manage all signlr hubs which the client consumes
///////////////////////////////////////////////////

import EventBus from '../EventBus'; 
import {
  HubConnectionBuilder,
  HttpTransportType,
  LogLevel,
} from '@aspnet/signalr';
import SignalrConfig from '../../configs/SignalrConfig';
import authProvider from '../AuthenticationProvider';
import { ChanelConfig } from '../../configs/GlobalConfig';

//TODO import { getDataRealtime } from '../../component/market/market-in-depth/index2/Fake';
//TODO import { getListRealtimeTick } from '../../component/market/watchlist/summary/Fake';
import { formatMessageData } from './helper';

class SignalrMessageHub extends EventBus {
  messageChanelToHubs = []; // map hubs to a label
  remoteChanelToHubs = []; // rpc
  queuedRemoteCalls = []; // if a rpc posted while connection down, push it to a queue

  constructor() {
    super();
    this.init();
  }
  count = 0;
  // iterate all signalr config and create connections
  init() {
    // setInterval( () => {
    //   const data = getListRealtimeTick();
    //   // console.log(data);
    //
    //   this.publish(ChanelConfig.TickChanel, data);
    // }, 1000);

    SignalrConfig.Hubs.forEach((hub, index) => {
      const connection = new HubConnectionBuilder()
        .withUrl(hub.ServerUrl, {
          transport: HttpTransportType.WebSockets, //HttpTransportType.LongPolling, // | HttpTransportType.WebSockets // websocket will throw error, can not resolve this yet
          accessTokenFactory: () =>
            authProvider.getUser().then(user => user.access_token),
          skipNegotiation: true,
        })
        .configureLogging(LogLevel.Error)
        .build();

      //map hub connection to a label
      this.messageChanelToHubs[hub.Prefix] = connection;

      connection.on('ReceiveMessage', message => {
        // console.log(message);
        // special process for tick data
        // if (message.chanel === ChanelConfig.TickChanel) {
        //   message.data.forEach(ticker => {
        //     this.publish(ChanelConfig.TickChanel + '.' + ticker.ticker, ticker);
        //   });
        // } else {\
        this.publish(
          message.chanel,
          formatMessageData(message.chanel, message.data),
        );
        // }
      });

      //do reconnect
      connection.onclose(e => setTimeout(() => this.connect(connection), 5000));

      this.connect(connection);

      //register rpc, map a rpc to a hub
      hub.RegisteredRemoteChanels.forEach((chanel, index) => {
        if (this.remoteChanelToHubs[chanel]) {
          throw new Error('Remote chanel is duplicated: ' + chanel);
        }
        this.remoteChanelToHubs[chanel] = connection;
      });
    });
  }

  async connect(hub) {
    let self = this;
    await hub
      .start()
      .then(() => self.runQueue())
      .catch(err => {
        // console.log(err);

        //try re-connecting after 5s
        setTimeout(() => {
          // console.log('reconnect');
          this.connect(hub);
        }, 5000);
      });
  }

  //push an action to the queue
  //it is posible for a race condition
  ensure(f) {
    this.queuedRemoteCalls.push(f);
  }

  runQueue() {
    if (this.queuedRemoteCalls && this.queuedRemoteCalls.length > 0) {
      this.queuedRemoteCalls.shift()();
    } else {
      setTimeout(this.runQueue, 1000);
    }
  }

  invoke(chanel, message, fail) {
    this.remoteChanelToHubs[chanel]
      .invoke(chanel, message)
      .catch(error => fail(error));
  }

  subscribe(chanel, action) {
    if (!this.chanels[chanel]) {
      this.chanels[chanel] = [];

      //register group on signalr server
      const hubPrefix = chanel.split('.')[0];
      if (this.messageChanelToHubs[hubPrefix]) {
        if (this.messageChanelToHubs[hubPrefix].connectionState === 1) {
          this.messageChanelToHubs[hubPrefix].invoke('JoinGroup', chanel);
          // .catch(e => console.log(e));
        } else {
          let self = this;
          this.ensure(() => {
            if (
              self.messageChanelToHubs[hubPrefix] &&
              self.messageChanelToHubs[hubPrefix].connectionState === 1
            ) {
              self.messageChanelToHubs[hubPrefix].invoke('JoinGroup', chanel);
            }
            // .catch(e => console.log(e));
          });
        }
      }
    }
    this.chanels[chanel].push(action);
  }

  unsubscribe(chanel, action) {
    if (this.chanels[chanel]) {
      this.chanels[chanel] = this.chanels[chanel].filter(a => a !== action);

      if (this.chanels[chanel].length === 0) {
        delete this.chanels[chanel];
      }

      //unregister group on signalr server
      const hubPrefix = chanel.split('.')[0];
      if (!this.chanels[chanel] && this.messageChanelToHubs[hubPrefix]) {
        if (this.messageChanelToHubs[hubPrefix].connectionState === 1) {
          this.messageChanelToHubs[hubPrefix].invoke('LeaveGroup', chanel);
          // .catch(e => console.log(e));
        } else {
          let self = this;
          this.ensure(() => {
            if (
              this.messageChanelToHubs[hubPrefix] &&
              this.messageChanelToHubs[hubPrefix].connectionState === 1
            ) {
              self.messageChanelToHubs[hubPrefix].invoke('LeaveGroup', chanel);
            }
            // .catch(e => console.log(e));
          });
        }
      }
    }
  }
}

const MessageHub = new SignalrMessageHub();

export default MessageHub;
