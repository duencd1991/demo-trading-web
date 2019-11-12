import React from 'react';
import Table from './Table';

class Financial extends React.Component {
  render() {
    return (
      <Table filter={this.props.filter}/>
    );
  }
}

export default Financial;
