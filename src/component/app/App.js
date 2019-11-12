import React, { Component } from 'react';
import Router from './routes';
import '../../assets/libraries/wtp24-icon/style.css';
import '../../assets/libraries/wtp24-icon/stock24.css';
import '../../styles/style.scss';

class App extends Component {
  render() {
    const store = this.props.store;
    return (
      <div>
        {/* <Router store={this.props.store}/> */}
        {Router(store)}
      </div>
    );
  }
}


export default App;
