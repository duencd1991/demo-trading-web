import React from 'react';
import Table from './Table';

class Performance extends React.Component {
  render() {
    return (
      <Table
        filter={this.props.filter}
      />
    );
  }
}

export default Performance;
