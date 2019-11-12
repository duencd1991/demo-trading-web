import React from 'react';
import { DropDown } from '../../../common/dropdown';
import Const from './Const';
import { connect } from 'react-redux';
import { changeEvenType, REDUCER_NAME } from '../reducer';
import { I18n } from 'react-redux-i18n';

class DropDownEvenType extends React.Component {
  render() {
    const { eventType, changeEvenType } = this.props;
    return (
      <div className="event-type ">
        {I18n.t('watchlistCalendar.eventType')}
        <DropDown
          keyTitle={'name'}
          isI18n={true}
          listKey={Const.listEvenType}
          listDataByKey={Const.listEvenTypeByKey}
          currentKey={eventType}
          change={value => changeEvenType(value)}
          isEditable={false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    eventType: state[REDUCER_NAME].eventType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeEvenType: eventType => dispatch(changeEvenType(eventType)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropDownEvenType);
