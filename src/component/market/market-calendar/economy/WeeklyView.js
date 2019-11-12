import React from 'react';
import { REDUCER_NAME, setActiveDayInWeek } from '../reducer'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n';
import moment from 'moment'

const I18N_NAME = 'common.lstLabelCalendar.'
class WeeklyView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeStatus !== nextProps.activeStatus) {
      const active = nextProps.activeStatus ? 'active' : '';
      this.setState({ ...this.state, active });
    }
  }

  handleWeeklyView = () => {
    const activeStatus = !this.props.activeStatus;
    const currentWeek = this.props.currentWeek;
    const position = this.props.position;
    const filterDate = this.props.filterDate;
    const params = {
      activeStatus,
      currentWeek,
      position,
      filterDate
    }
    this.props.setActiveDayInWeek(params);
    const active = activeStatus ? 'active' : '';
    this.setState({ ...this.state, active });
  }

  render() {
    const { from, to } = this.props;
    return (
      <>
        {I18n.t(`${I18N_NAME}from`)} <span className="sub-text-calendar">{moment().weekday(from).format('ddd, MMMM Do YYYY')+' '}</span>{I18n.t(`${I18N_NAME}to`)} <span className="sub-text-calendar">{moment().weekday(to).format('ddd, MMMM Do YYYY')}</span>
        <a className={`btn btn-cus-nomal bg-b-color-3 float-right d-inline-block ${this.state.active}`} onClick={() => this.handleWeeklyView()}>{I18n.t('economy.listLabel.weekly')}</a>
      </>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    activeStatus: state[REDUCER_NAME].activeStatus,
    currentWeek: state[REDUCER_NAME].currentWeek,
    position: state[REDUCER_NAME].position,
    filterDate: state[REDUCER_NAME].filterDate
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveDayInWeek: (params) => dispatch(setActiveDayInWeek(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyView);
