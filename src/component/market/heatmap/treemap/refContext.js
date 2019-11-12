import React from 'react';

export const { Provider, Consumer } = React.createContext(null);

export const withRootRef = Component => props => (
  <Consumer>
    {rootRef => (
      <Component {...props} rootRef={rootRef} />
    )}
  </Consumer>
);
