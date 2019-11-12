import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { keyBy } from 'lodash';

//TODO import './index.scss';
import CommonTable from '../../../../common/table';
import { REDUCER_NAME, fetchMostPopular } from '../../../../reducer';
import Const from '../../../../Const';
import { getDataFollowKeyByDot } from '../../../../../helpers/Common';

class MostPopular extends React.Component {
  componentDidMount() {
    const { fetchMostPopular } = this.props;
    fetchMostPopular();
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
      mostPopularData: { data, isLoading, filterCondition },
      mostPopularData,
    } = this.props;

    const filteredData = this.transformData(data, filterCondition);

    return (
      <div className="na-wrapper">
        <CommonTable
          listColumn={Const.MostPopularTable}
          ids={filteredData.map(item =>
            getDataFollowKeyByDot(item, Const.MostPopularTable.ID),
          )}
          list={keyBy(filteredData, Const.MostPopularTable.ID)}
          isLoading={isLoading}
          type="mp"
          commonData={mostPopularData}
          isGroupData={false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    mostPopularData: state[REDUCER_NAME].mostPopularData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMostPopular: () => dispatch(fetchMostPopular()),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(MostPopular);
