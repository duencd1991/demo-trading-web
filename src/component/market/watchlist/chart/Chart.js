import React from 'react';
import { REDUCER_NAME, fetchChartImage } from './../reducer';
import { connect } from 'react-redux';
import { GridImage } from './../../../common/grid-image';

const mapStateToProps = state => {
  return {
    listId: state[REDUCER_NAME].listTickerSummaryTable,
    component: state[REDUCER_NAME].component,
  };
};

const mapDispatchToProps = {
  fetchImage: fetchChartImage,
};

const getImageFromRedux = state => state[REDUCER_NAME].images;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chart);

function Chart(props) {
  return <GridImage {...props} getImageFromRedux={getImageFromRedux} />;
}
