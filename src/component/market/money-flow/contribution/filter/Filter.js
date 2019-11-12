import React from 'react';
import { DropDown } from './../../../../common/dropdown';
import Const from './../../Const';
import { changeComGroupCode, REDUCER_NAME } from './../reducer';
import { connect } from 'react-redux';
import TimeRange from './TimeRange';

class Filter extends React.Component {
  render() {
    return (
      <div className="list-filter mb-20">
        <div className="line-drop ">
          <DropDown
            currentKey={this.props.comGroupCode}
            listKey={Const.listOrganCodeFilter}
            listDataByKey={Const.listFilterByOrganCode}
            change={this.props.changeComGroupCode}
          />
        </div>
        <TimeRange />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comGroupCode: state[REDUCER_NAME].comGroupCode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeComGroupCode: comGroupCode =>
      dispatch(changeComGroupCode(comGroupCode)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
