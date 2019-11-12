import React from 'react';
import { connect } from 'react-redux';
import SearchBox from './SearchBox';
import PriceInfo from './PriceInfo';
import { fetchListSearch } from './../reducer';

class IndexSummary extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchListSearch());
  }

  render() {
    return (
      <div className="left-info-widget">
        <SearchBox />
        <PriceInfo />
      </div>
    );
  }
}

export default connect()(IndexSummary);
