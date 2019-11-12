import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { keyBy, uniqBy } from 'lodash';

//TODO import './index.scss';
import CommonTable from '../../common/table';
import { REDUCER_NAME, fetchAutoNews } from '../../reducer';
import Const from '../../Const';
import { getDataFollowKeyByDot } from '../../../helpers/Common';

class AutoNews extends React.Component {
  componentDidMount() {
    const { fetchAutoNews } = this.props;
    fetchAutoNews();
  }

  componentDidUpdate(prevProps) {
    const { fetchAutoNews } = this.props;
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      fetchAutoNews();
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
      autoNewsData: {
        data,
        isLoading,
        filterCondition,
        isShortByFavorite,
        storeName,
      },
      autoNewsData,
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
          listColumn={Const.AutoNewsTable}
          list={listFullData}
          isLoading={isLoading}
          isShortByFavorite={isShortByFavorite}
          type="an"
          commonData={autoNewsData}
          {...optProps}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    autoNewsData: state[REDUCER_NAME].autoNewsData,
    i18n: state.i18n,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAutoNews: status => dispatch(fetchAutoNews(status)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AutoNews);
