import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { keyBy, uniqBy } from 'lodash';

//TODO import './index.scss';
import CommonTable from '../../common/table';
import { REDUCER_NAME, fetchAggregatorNews } from '../../reducer';
import Const from '../../Const';
import { getDataFollowKeyByDot } from '../../../helpers/Common';

class NewsAggregator extends React.Component {
  componentDidMount() {
    const { fetchAggregatorNews } = this.props;
    fetchAggregatorNews();
  }

  componentDidUpdate(prevProps) {
    const { fetchAggregatorNews } = this.props;
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      fetchAggregatorNews();
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
      aggregatorNewsData: {
        data,
        isLoading,
        filterCondition,
        isShortByFavorite,
        storeName,
      },
      aggregatorNewsData,
    } = this.props;

    const filteredData = this.transformData(data, filterCondition);
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
          listColumn={Const.NewsAggregatorTable}
          list={listFullData}
          isLoading={isLoading}
          isShortByFavorite={isShortByFavorite}
          type="na"
          commonData={aggregatorNewsData}
          {...optProps}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    aggregatorNewsData: state[REDUCER_NAME].aggregatorNewsData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAggregatorNews: status => dispatch(fetchAggregatorNews(status)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(NewsAggregator);
