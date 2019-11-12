import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { keyBy, uniqBy } from 'lodash';

//TODO import './index.scss';
import CommonTable from '../../../../common/table';
import {
  REDUCER_NAME,
  fetchMostPopular,
  fetchMostRecent,
} from '../../../../reducer';
import Const from '../../../../Const';
import { getDataFollowKeyByDot } from '../../../../../helpers/Common';

class MostPopular extends React.Component {
  componentDidMount() {
    const { fetchMostPopular, fetchMostRecent } = this.props;
    fetchMostPopular();
    fetchMostRecent();
  }

  componentDidUpdate(prevProps) {
    const { fetchMostRecent, fetchMostPopular } = this.props;
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      fetchMostRecent();
      fetchMostPopular();
    }
  }

  transformData = (data, filterCondition) => {
    if (Object.keys(filterCondition).length) {
      const filteredData = data.filter(function(item) {
        for (var key in filterCondition) {
          if (item[key] === undefined || item[key] != filterCondition[key])
            return false;
        }
        return true;
      });

      return filteredData;
    }
    return data;
  };

  render() {
    const {
      mostPopularData,
      mostRecentData,
      favoriteData: { filterCondition },
    } = this.props;

    const isShortByFavorite = true;

    const data = [...mostPopularData.data, ...mostRecentData.data];
    // combine data

    const uniqueData = uniqBy(data, e => {
      return e[Const.MostPopularTable.ID];
    });
    // get unique data

    const filteredData = this.transformData(uniqueData, filterCondition);

    //data with condition
    const listIdsInLocalStoreMostRecent =
      JSON.parse(localStorage.getItem(mostRecentData.storeName)) || [];
    const listIdsInLocalStoreMostPopular =
      JSON.parse(localStorage.getItem(mostPopularData.storeName)) || [];
    //data in Local Store

    const combineListIdsInLocalStore = [
      ...listIdsInLocalStoreMostRecent,
      ...listIdsInLocalStoreMostPopular,
    ];

    const uniqueIds = uniqBy(combineListIdsInLocalStore, e => {
      return e;
    });

    // make list unique

    const listFullData = keyBy(filteredData, Const.MostPopularTable.ID);
    const listIds = filteredData.map(item =>
      getDataFollowKeyByDot(item, Const.MostPopularTable.ID),
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
      <div className="fv-wrapper">
        {/* <CommonTable
          listColumn={Const.MostPopularTable}
          list={listFullData}
          isLoading={mostPopularData.isLoading && mostRecentData.isLoading}
          type="fv"
          commonData={mostPopularData}
          {...optProps}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    mostPopularData: state[REDUCER_NAME].mostPopularData,
    mostRecentData: state[REDUCER_NAME].mostRecentData,
    favoriteData: state[REDUCER_NAME].favoriteData,
    i18n: state.i18n,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMostPopular: () => dispatch(fetchMostPopular()),
    fetchMostRecent: () => dispatch(fetchMostRecent()),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(MostPopular);
