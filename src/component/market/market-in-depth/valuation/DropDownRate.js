import React from 'react';
import { DropDown } from '../../../common/dropdown';
import Const from './Const';
import { connect } from 'react-redux';
import { changeRate, REDUCER_NAME } from './reducer';

class DropDownRate extends React.Component {
  render() {
    const { rate, changeRate } = this.props;
    return (
      <DropDown
        keyTitle="name"
        listKey={Const.listRate}
        listDataByKey={Const.listRateByKey}
        currentKey={rate}
        change={changeRate}
        isEditable={false}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    rate: state[REDUCER_NAME].rate,
  };
};

const mapDispatchToProps = {
  changeRate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropDownRate);
