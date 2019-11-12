import React from 'react';
import Table from './Table';

class Overview extends React.Component {
  render() {
    return (
      <Table
        filter={this.props.filter}
      />
    );
  }
}

export default Overview;
