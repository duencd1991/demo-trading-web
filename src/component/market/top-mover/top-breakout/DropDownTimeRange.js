import React from 'react';
import { connect } from 'react-redux';
import { I18n } from "react-redux-i18n";
import { DropDown } from "../../../common/dropdown";
import { changeTimeRange, REDUCER_NAME } from "./reducer";

class DropDownTimeRange extends React.Component {
  getListDataByKey = () => {
    const data = I18n.t("topBreakout.timeRangeList")
    return Object.keys(data).reduce((result, key) => {
      return {
        ...result,
        [key]: { key, name: data[key] }
      }
    }, {})
  }

  onChange = (value) => {
    const { changeTimeRange, comGroupCode } = this.props
    changeTimeRange(value, comGroupCode)
  }

  render() {
    const { timeRange } = this.props;
    return (
      <div className="item-filter">
      <DropDown
        listKey={Object.keys(I18n.t("topBreakout.timeRangeList"))}
        listDataByKey={this.getListDataByKey()}
        currentKey={timeRange || I18n.t("topBreakout.defaultTimeRange")}
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
    filter : state[REDUCER_NAME].filter,
    timeRange: state[REDUCER_NAME].timeRange,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTimeRange: (filter,timeRange) => dispatch(changeTimeRange(filter,timeRange)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDownTimeRange);
