import React from 'react';
import { connect } from 'react-redux';
import Table from './Table';
class Technical extends React.Component {

  render() {
    return (
      <Table />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  }
};

export default connect(mapStateToProps)(Technical);
