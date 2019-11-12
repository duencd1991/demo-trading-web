import React from 'react';
import { connect } from 'react-redux';
import { DropDown } from '../../../../common/dropdown';
import Const from '../Const';
import { changeFilterYear, REDUCER_NAME } from '../reducer';

const mapStateToProps = state => {
  return {
    currentKey: state[REDUCER_NAME].currentYear,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    change: key => dispatch(changeFilterYear(key)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterYearTable);

function FilterYearTable(props) {
  const { currentKey, change } = props;

  return (
    <div className="float-right anomaly-filter">
      <div className="list-filter float-right mt-10 mr-10">
        <div className="line-drop">
          <DropDown
            listKey={Const.listKeyFilterYear}
            listDataByKey={Const.listFilterYearByKey}
            keyTitle={'title'}
            currentKey={currentKey}
            change={change}
            isI18n={true}
          />
        </div>
      </div>
    </div>
  );
}
