// const SignalrConfig = {
//     Hubs: [
//         {
//             ServerUrl: 'http://42.112.22.11:2009/RealtimeHub',
//             Prefix: 'Realtime',
//             RegisteredRemoteChanels: [

//             ]
//         }
//     ]
// }

const SignalrConfig = {
  Hubs: [
    {
      ServerUrl: 'http://42.112.22.11:2009/RealtimeHub',
      Prefix: 'Realtime',
      RegisteredRemoteChanels: [],
    },
    {
      ServerUrl: 'http://42.112.22.11:2003/MarketHub',
      Prefix: 'Market',
      RegisteredRemoteChanels: [],
    },
    {
      ServerUrl: 'http://42.112.22.11:2005/NotificationHub',
      Prefix: 'Notification',
      RegisteredRemoteChanels: [],
    },
  ],
};

export default SignalrConfig;
