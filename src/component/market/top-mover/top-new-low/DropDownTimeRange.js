import React from 'react';
import { connect } from 'react-redux';
import { I18n } from "react-redux-i18n";
import { DropDown } from "../../../common/dropdown";
import { changeTimeRange, REDUCER_NAME } from "./reducer";
import Const from '../top-new-high/Const';

class DropDownTimeRange extends React.Component {
  getListDataByKey = () => {
    const data = I18n.t("topNewHigh.timeRangeList")
    return Object.keys(data).reduce((result, key) => {
      return {
        ...result,
        [key]: { key, name: data[key] }
      }
    }, {})
  }

  onChange = (value) => {
    const { changeTimeRange, comGroupCode, allExchanges } = this.props
    changeTimeRange(value, comGroupCode, allExchanges)
  }

  render() {
    const { timeRange } = this.props;
    return (
      <div className="line-drop">
        <DropDown
          listKey={Object.keys(I18n.t("topNewHigh.timeRangeList"))}
          listDataByKey={this.getListDataByKey()}
          currentKey={timeRange || Const.defaultTimeRange}
          keyTitle={'name'}
          change={this.onChange}
          isEditable={false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    filter: state[REDUCER_NAME].filter,
    timeRange: state[REDUCER_NAME].timeRange,
  }
};

const mapDispatchToProps = {
  changeTimeRange,
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDownTimeRange);
