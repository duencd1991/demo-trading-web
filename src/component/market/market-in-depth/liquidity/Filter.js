import React from 'react';
import { DropDown } from './../../../common/dropdown';
import Const from './Const';
import { connect } from 'react-redux';
import { REDUCER_NAME, changeComGroupCode } from './reducer';
import './liquidity.scss';

class Filter extends React.Component {
  render() {
    const { comGroupCode, changeComGroupCode } = this.props;

    return (
      <div className="list-filter">
        <div className="line-drop" style={{ width: 100 }}>
          <DropDown
            currentKey={comGroupCode}
            listKey={Const.listComGroupCodeFilter}
            listDataByKey={Const.listFilterByComGroupCode}
            change={changeComGroupCode}
            keyTitle="name"
            isEditable={false}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comGroupCode: state[REDUCER_NAME].comGroupCode,
  };
};

const mapDispatchToProps = {
  changeComGroupCode,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
