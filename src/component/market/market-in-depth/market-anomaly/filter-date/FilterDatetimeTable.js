import { connect } from 'react-redux';
import { changeFilterDatetime, REDUCER_NAME } from '../reducer';
import { I18n } from 'react-redux-i18n';
import React from 'react';
import Const from '../Const';

const mapStateToProps = state => {
  return {
    currentFilterDatetime: state[REDUCER_NAME].currentFilterDatetime,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFilterDatetime: key => dispatch(changeFilterDatetime(key)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterDatetimeTable);

function FilterDatetimeTable(props) {
  const listTitle = I18n.t('marketInDepthAnomaly.listFilterDatetime');

  const { currentFilterDatetime, changeFilterDatetime } = props;
  return (
    <div className="w-100 float-right">
      <div
        className="check-list-inline text-right mt-10"
        style={{ width: 'calc(100% - 10px)' }}
      >
        <div className="list-check">
          {Const.listKeyFilterDateTime.map(key => {
            return (
              <div className="checkbox" key={key}>
                <input
                  id="check3"
                  type="checkbox"
                  checked={currentFilterDatetime === key}
                  onChange={() => changeFilterDatetime(key)}
                />
                <label htmlFor="check3">
                  <span className="text-white">{listTitle[key]}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
