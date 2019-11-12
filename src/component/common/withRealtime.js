import React from 'react';
//TODO import MessageHub from '../../core/signalr/SignalrMessageHub';

const withRealtime = (channel, action) => WrappedComponent => {
  class WithRealtime extends React.Component {
    dispatchAction = data => {
      const { id: componentId = '' } = this.props;

      this.props[action](data, componentId);
    };

    componentDidMount() {
      //TODO MessageHub.subscribe(channel, this.dispatchAction);
    }

    componentWillUnmount() {
      //TODO MessageHub.unsubscribe(channel, this.dispatchAction);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const nameWrappedComponent =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  WithRealtime.displayName = `withRealtime(${nameWrappedComponent})`;

  return WithRealtime;
};

export default withRealtime;
