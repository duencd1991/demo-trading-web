import React from 'react';
import { connect } from 'react-redux';
import { changeTimeRange, REDUCER_NAME } from './../reducer';
import { I18n } from 'react-redux-i18n';
import Const from './../Const';


class TimeRange extends React.Component {
  render() {
    const timeRangeTitle = I18n.t('moneyFlowContribution.timeRange');

    return (
      <div className="tabs-right-top mt-5 ml-20">
        <div className="btn-groupcus-line">
          {
            Object.keys(Const.listTimeRange).map(key => {
              let className = 'btn btn-cus-nomal bg-b-color-3';
              if (this.props.timeRange === Const.listTimeRange[key]) {
                className += ' active';
              }
              return <a key={key} href="#" className={className}
                        onClick={() => this.props.changeTimeRange(Const.listTimeRange[key])}>{timeRangeTitle[key]}</a>
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    timeRange: state[REDUCER_NAME].timeRange,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTimeRange: (timeRange) => dispatch(changeTimeRange(timeRange)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeRange);
