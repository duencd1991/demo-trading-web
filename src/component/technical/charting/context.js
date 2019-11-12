import React from 'react';

export const { Provider, Consumer } = React.createContext(null);

export const withWidget = Component => props => (
  <Consumer>
    {widget => <Component {...props} widget={widget} />}
  </Consumer>
);
