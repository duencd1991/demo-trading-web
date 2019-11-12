import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { I18n } from 'react-redux-i18n';

import SearchBox from '../common/search-box';
import SwitchChildTab from '../common/switch-child-tab';
import Filter from '../common/filter';
import FilterTrustability from '../common/filter-trustability';
import { REDUCER_NAME } from '../reducer';
import './index.scss';
const FORMAT_DATE = 'dddd, MMMM DD, YYYY';

class SwitchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTrustability: [
        { value: 'LOW', color: 'bg-l-color-3', isChecked: true },
        { value: 'MED', color: 'bg-s-color-4', isChecked: true },
        { value: 'HIGH', color: 'bg-s-color-3', isChecked: true },
      ],
    };
  }

  render() {
    const { currentTab, handleSwitchTab, currentDataGetFrom } = this.props;
    const {
      apiParams: { FromDate, ToDate },
      apiParams,
    } = this.props[currentDataGetFrom];
    return (
      <div className="na-top-content-wrapper">
        <div className="action-content">
          <SearchBox apiParams={apiParams} />
          {currentTab === 5 && <FilterTrustability />}

          {currentTab !== 4 && <Filter />}

          {currentTab === 4 && (
            <SwitchChildTab handleSwitchTab={handleSwitchTab} />
          )}
        </div>
        {FromDate || ToDate ? (
          <div className="info-content d-flex">
            <div className="main-text">From</div>
            <div className="sub-text">{`${moment(FromDate).format(
              FORMAT_DATE,
            )}`}</div>
            <div className="main-text">to</div>
            <div className="sub-text">{`${moment(ToDate).format(
              FORMAT_DATE,
            )}`}</div>
          </div>
        ) : (
          <div className="info-content" />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { currentDataGetFrom } = props;
  return {
    i18n: state.i18n,
    [currentDataGetFrom]: state[REDUCER_NAME][currentDataGetFrom],
  };
};

export default connect(mapStateToProps)(SwitchTab);
