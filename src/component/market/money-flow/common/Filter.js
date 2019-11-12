import React from 'react';
import DropDown from '../../../common/dropdown/DropDown';
import Const from '../Const';
import { connect } from 'react-redux';
import { REDUCER_NAME, changeComGroupCode } from '../reducer';

const mapStateToProps = (state) => {
  return {
    comGroupCode: state[REDUCER_NAME].comGroupCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeComGroupCode: (comGroupCode) => dispatch(changeComGroupCode(comGroupCode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

function Filter(props) {

  const listOrganCodeFilter = (props.tab === 'Proprietary')
    ? Const.listOrganCodeFilterProprietary
    : Const.listOrganCodeFilter;

  return (
    <div className="list-filter">
      <div className="line-drop">
        <DropDown
          currentKey={props.comGroupCode}
          listKey={listOrganCodeFilter}
          listDataByKey={Const.listFilterByOrganCode}
          change={props.changeComGroupCode}
        />
      </div>
    </div>
  );
}
