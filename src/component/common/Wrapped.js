import React from 'react';
import Provider from "react-redux/es/components/Provider";

export function wrapComponent(Component, store) {
  class Wrapped extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <Component {...this.props}/>
        </Provider>
      );
    }
  }

  return Wrapped;
}
