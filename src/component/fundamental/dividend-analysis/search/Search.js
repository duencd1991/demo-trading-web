import React from 'react';
import SearchBox from './SearchBox';
import PriceInfo from './PriceInfo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withComponentId } from './../../../common/ComponentIdContext';
import { REDUCER_NAME } from '../reducer';

class IndicatorsSearch extends React.Component {
  render() {
    const { condition = {}, componentId } = this.props;

    const {
      code = '',
      displayCode = '',
      companyName = '',
      indexData,
      dataRealtime,
    } = condition;

    return (
      <div className="left-info-widget pr-20">
        <SearchBox
          code={code}
          displayCode={displayCode}
          companyName={companyName}
          id={componentId}
        />
        <PriceInfo indexData={dataRealtime ? dataRealtime : indexData} />
      </div>
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    componentId,
    condition: state[REDUCER_NAME].listMultiComponent[componentId].condition,
  };
};

export default compose(
  withComponentId,
  connect(mapStateToProps),
)(IndicatorsSearch);
