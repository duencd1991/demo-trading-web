import React from 'react';
import { connect } from 'react-redux';
import { I18n } from "react-redux-i18n";
import { DropDown } from "../../../common/dropdown";
import { changeRate, REDUCER_NAME } from "./reducer";

class DropDownRate extends React.Component {
  getListDataByKey = () => {
    const data = I18n.t("topBreakout.rateList")
    return Object.keys(data).reduce((result, key) => {
      return {
        ...result,
        [key]: { key, name: data[key] }
      }
    }, {})
  }

  onChange = (rate) => {
    const { changeRate, comGroupCode } = this.props
    changeRate(rate, comGroupCode)
  }

  render() {
    const { rate } = this.props;
    return (
      <div className="item-filter">
      <DropDown
        listKey={Object.keys(I18n.t("topBreakout.rateList"))}
        listDataByKey={this.getListDataByKey()}
        currentKey={rate || I18n.t("topBreakout.defaultRate")}
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
    rate: state[REDUCER_NAME].rate,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeRate: (filter,rate) => dispatch(changeRate(filter,rate)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDownRate);
