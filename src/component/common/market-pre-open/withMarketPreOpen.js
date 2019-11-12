import React from 'react';
import MarketPreOpen from './MarketPreOpen';

const withMarketPreOpen = (className = 'position-absolute') => Component => {
  class WithMarketPreOpen extends React.PureComponent {
    render() {
      return (
        <MarketPreOpen className={className}>
          <Component {...this.props} />
        </MarketPreOpen>
      );
    }
  }

  const nameWrappedComponent =
    Component.displayName || Component.name || 'Component';

  WithMarketPreOpen.displayName = `withMarketPreOpen(${nameWrappedComponent})`;

  return WithMarketPreOpen;
};

export default withMarketPreOpen;
