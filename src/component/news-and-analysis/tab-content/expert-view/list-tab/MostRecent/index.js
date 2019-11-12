import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { keyBy } from 'lodash';

//TODO import './index.scss';
import CommonTable from '../../../../common/table';
import { REDUCER_NAME, fetchMostRecent } from '../../../../reducer';
import Const from '../../../../Const';
import { getDataFollowKeyByDot } from '../../../../../helpers/Common';

class MostRecent extends React.Component {
  componentDidMount() {
    const { fetchMostRecent } = this.props;
    fetchMostRecent();
  }

  componentDidUpdate(prevProps) {
    const { fetchMostRecent } = this.props;
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      fetchMostRecent();
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
      mostRecentData: { data, isLoading, filterCondition },
      mostRecentData,
    } = this.props;

    const filteredData = this.transformData(data, filterCondition);

    return (
      <div className="na-wrapper">
        <CommonTable
          listColumn={Const.MostRecentTable}
          ids={filteredData.map(item =>
            getDataFollowKeyByDot(item, Const.MostRecentTable.ID),
          )}
          list={keyBy(filteredData, Const.MostRecentTable.ID)}
          isLoading={isLoading}
          type="mr"
          commonData={mostRecentData}
          isGroupData={false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    mostRecentData: state[REDUCER_NAME].mostRecentData,
    i18n: state.i18n,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMostRecent: () => dispatch(fetchMostRecent()),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(MostRecent);
