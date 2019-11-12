import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { keyBy, uniqBy } from 'lodash';

import './index.scss';
import CommonTable from '../../common/table';
import { REDUCER_NAME, fetchRumors } from '../../reducer';
import Const from '../../Const';
import { getDataFollowKeyByDot } from '../../../helpers/Common';

class Rumors extends React.Component {
  componentDidMount() {
    const { fetchRumors } = this.props;
    fetchRumors();
  }

  componentDidUpdate(prevProps) {
    const { fetchRumors } = this.props;
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      fetchRumors();
    }
  }

  transformData = (data, filterCondition) => {
    if (filterCondition.length) {
      const filteredData = data.filter(item => {
        return filterCondition.includes(item[Const.RumorsTable.TRUSTABILITY]);
      });
      return filteredData;
    }
    return data;
  };

  render() {
    const {
      rumorsData: {
        data,
        isLoading,
        filterCondition,
        isShortByFavorite,
        storeName,
      },
      rumorsData,
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
          listColumn={Const.RumorsTable}
          list={listFullData}
          isLoading={isLoading}
          isShortByFavorite={isShortByFavorite}
          type="r"
          commonData={rumorsData}
          {...optProps}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rumorsData: state[REDUCER_NAME].rumorsData,
    i18n: state.i18n,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRumors: () => dispatch(fetchRumors()),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Rumors);
