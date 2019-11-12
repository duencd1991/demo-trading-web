import React from 'react';
import { connect } from 'react-redux';
import { fetchChartImage, REDUCER_NAME } from '../reducer';
import '../../top-mover.scss';
import { GridImage } from './../../../../common/grid-image';

const mapStateToProps = state => {
  return {
    listId: state[REDUCER_NAME].listDataTopForeignTradeTicker,
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
