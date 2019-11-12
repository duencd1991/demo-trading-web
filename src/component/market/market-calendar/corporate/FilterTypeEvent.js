import { connect } from 'react-redux';
import { REDUCER_NAME, changeFilterEvent } from '../reducer';
import { I18n } from 'react-redux-i18n';
import Const from './Const';
import React from 'react';
import { SimpleTooltip } from './../../../common/tooltip';

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    currentFilterEvents: state[REDUCER_NAME].currentFilterEvents,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFilterEvent: key => dispatch(changeFilterEvent(key)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(filterTypeEvent);

const getColor = key => {
  const LIST_COLOR = {
    ERN: 'bg-c-color-1',
    DIV: 'bg-s-color-4',
    SIS: 'bg-c-color-3',
    IPO: 'bg-l-color-12',
    AGM: 'bg-s-color-3',
  };
  return LIST_COLOR[key];
};

function filterTypeEvent(props) {
  const listTitle = I18n.t('marketCalendarCorporate.listFilterEvent');
  const listTooltip = I18n.t('marketCalendarCorporate.listFilterEventTooltip');
  const { currentFilterEvents, changeFilterEvent } = props;

  return (
    <div className="check-list-inline">
      <div className="list-check">
        {Const.listKeyFilterEvent.map((key, index) => {
          return (
            <SimpleTooltip
              message={listTooltip[key]}
              position={'top'}
              key={key}
            >
              <div className="checkbox">
                <input
                  id={`cb-${index}`}
                  type="checkbox"
                  checked={currentFilterEvents === key}
                  onChange={() => changeFilterEvent(key)}
                />
                <label htmlFor={`cb-${index}`}>
                  <div className="loc text-truncate">
                    <a
                      href="#"
                      className={`badge ${getColor(
                        key.toUpperCase(),
                      )} text-white`}
                    >
                      {listTitle[key]}
                    </a>
                  </div>
                </label>
              </div>
            </SimpleTooltip>
          );
        })}
      </div>
    </div>
  );
}
