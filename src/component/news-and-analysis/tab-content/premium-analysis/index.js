import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { keyBy, uniqBy } from 'lodash';

//TODO import './index.scss';
import CommonTable from '../../common/table';
import { REDUCER_NAME, fetchPremiumAnalysis } from '../../reducer';
import Const from '../../Const';
import { getDataFollowKeyByDot } from '../../../helpers/Common';

class PremiumAnalysis extends React.Component {
  componentDidMount() {
    const { fetchPremiumAnalysis } = this.props;
    fetchPremiumAnalysis();
  }

  componentDidUpdate(prevProps) {
    const { fetchPremiumAnalysis } = this.props;
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      fetchPremiumAnalysis();
    }
  }

  render() {
    const {
      premiumAnalysisData: { data, isLoading, isShortByFavorite, storeName },
      premiumAnalysisData,
    } = this.props;

    const filteredData = data;
    //data with condition
    const listIdsInLocalStore =
      JSON.parse(localStorage.getItem(storeName)) || [];
    //data in Local Store
    const uniqueIds = uniqBy(listIdsInLocalStore, e => {
      return e;
    });
    // make list unique

    const listFullData = keyBy(filteredData, Const.NewsAggregatorTable.ID);
    const listIds = filteredData.map(item =>
      getDataFollowKeyByDot(item, Const.NewsAggregatorTable.ID),
    );
    const idsInCurrentList = uniqueIds.filter(id => listIds.includes(id));

    const optProps = isShortByFavorite
      ? {
          isGroupData: false,
          ids: idsInCurrentList,
        }
      : {
          ids: listIds,
        };

    return (
      <div className="na-wrapper">
        <CommonTable
          listColumn={Const.PremiumAnalysisTable}
          list={listFullData}
          isLoading={isLoading}
          isShortByFavorite={isShortByFavorite}
          type="pa"
          commonData={premiumAnalysisData}
          {...optProps}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    premiumAnalysisData: state[REDUCER_NAME].premiumAnalysisData,
    i18n: state.i18n,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPremiumAnalysis: status => dispatch(fetchPremiumAnalysis(status)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PremiumAnalysis);
