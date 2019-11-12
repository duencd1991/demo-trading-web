import React from 'react';
import { ChanelConfig } from '../../../../configs/GlobalConfig';
import MessageHub from '../../../../core/signalr/SignalrMessageHub';

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withTabAndRealTime = WrappedComponent => {
  class WithTab extends React.PureComponent {
    state = {
      indexTab: 1,
      typeTab: 1,
    };

    componentDidMount() {
      MessageHub.subscribe(ChanelConfig.TickChanel, this.dispatchDataRealtime);
    }

    componentWillUnmount() {
      MessageHub.unsubscribe(ChanelConfig.TickChanel, this.dispatchDataRealtime);
    }

    dispatchDataRealtime = (data) => {
      const { dispatchRealtime } = this.props;
      dispatchRealtime(data);
    };

    changeIndex = (indexTab) => {
      this.setState({
        indexTab,
      });
    };

    changeType = (typeTab) => {
      this.setState({
        typeTab,
      });
    };

    render() {
      const { indexTab, typeTab } = this.state;
      return (
        <WrappedComponent
          indexTab={indexTab}
          typeTab={typeTab}
          changeIndex={this.changeIndex}
          changeType={this.changeType}
        />
      );
    }
  }

  WithTab.displayName = `WithTabAndRealtime(${getDisplayName(WrappedComponent)})`;

  return WithTab;
};

export default withTabAndRealTime;
