import React from 'react';
import { connect } from 'react-redux';
import SearchBox from './SearchBox';
import PriceInfo from './PriceInfo';
import { fetchLastPrice, REDUCER_NAME } from './reducer';

class IndicatorsSearch extends React.Component {
  componentDidMount() {
    const { fetchLastPrice, code, id } = this.props;
    fetchLastPrice(code, id);
  }

  render() {
    const { code, displayCode, id, indexDataById, companyName } = this.props;
    return (
      <div className="left-info-widget">
        <SearchBox code={code} displayCode={displayCode} id={id} companyName={companyName} />
        <PriceInfo indexData={id in indexDataById ? indexDataById[id] : null} />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchLastPrice,
};

const mapStateToProps = (state) => {
  return {
    indexDataById: state[REDUCER_NAME].indexDataById,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorsSearch);
