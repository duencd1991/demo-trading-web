import React from 'react';

export const { Provider, Consumer } = React.createContext(null);

export const withComponentId = Component => props => (
  <Consumer>
    {componentId => <Component {...props} componentId={componentId} />}
  </Consumer>
);
