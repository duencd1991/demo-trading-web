import React from 'react';
import _, { debounce } from 'lodash';
import { I18n } from 'react-redux-i18n';
import { REDUCER_NAME, setActiveDayInWeek, setParamsEco } from '../reducer';
import { connect } from 'react-redux';
import moment from 'moment';

const dayInWeek = {
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
};
class TimeLine extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      listActiveDate: [
        { day: dayInWeek.mon, active: '' },
        { day: dayInWeek.tue, active: '' },
        { day: dayInWeek.wed, active: '' },
        { day: dayInWeek.thu, active: '' },
        { day: dayInWeek.fri, active: '' },
      ],
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    const currentNumberDate = moment().weekday() + 1;
    this.setActiveDate(currentNumberDate);
  }

  componentWillReceiveProps(nextProps) {
    const { currentWeek } = this.props;
    if (currentWeek !== nextProps.currentWeek) {
      this.setActiveDate(nextProps.position);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //reset active when click weekly
    const { activeStatus } = this.props;
    if (prevProps.activeStatus !== activeStatus && activeStatus) {
      this.setState({ ...this.initialState });
    }

    if (prevProps.activeStatus !== activeStatus && !activeStatus) {
      this.setActiveDate(this.props.position);
    }
  }

  setActiveDate(day) {
    const clone = [...this.state.listActiveDate];
    const newClone = clone.map(item => {
      if (item.day === day) {
        return {
          ...item,
          active: 'active',
        };
      } else {
        return {
          ...item,
          active: '',
        };
      }
    });
    this.setState({ listActiveDate: newClone });
  }

  getMonthOfWeek(numberWeek) {
    return moment()
      .weekday(numberWeek - 1)
      .format('MMMM');
  }

  getDateNumberOfWeek(numberWeek) {
    return moment()
      .weekday(numberWeek - 1)
      .toDate()
      .getDate();
  }

  getDayOfWeek(numberWeek) {
    return moment()
      .weekday(numberWeek - 1)
      .format('ddd');
  }

  clickDay = day => {
    const params = {
      activeStatus: false,
      currentWeek: this.props.currentWeek,
      position: day,
      filterDate: moment()
        .weekday(this.props.currentWeek + day - 2)
        .format('dddd, MMMM DD, YYYY'),
    };
    this.setActiveDate(day);
    this.props.setActiveDayInWeek(params);
  };

  render() {
    const { currentWeek, handleWeek } = this.props;
    if (this.props.i18n.locale === 'en') {
      moment.locale('en', {
        week: {
          dow: 1,
        },
      });
    } else {
      moment.locale('vi-VN');
    }
    return (
      <>
        <div className="">
          <div className="">
            <div className="timeline" style={{ display: 'flex' }}>
              <div className="timeline-nav-prev">
                <a
                  className="text-nowrap"
                  href="#"
                  onClick={() => handleWeek('prev')}
                >
                  {I18n.t('economy.listLabel.prevWeek')}
                </a>
              </div>
              {this.state.listActiveDate.map((key, index) => {
                return (
                  <div className="timeline-node" key={key.day}>
                    <div className="timeline-day">
                      <div
                        className={`group-day ${
                          this.state.listActiveDate[index].active
                        }`}
                        onClick={() => this.clickDay(index + 1)}
                      >
                        <span className="day">
                          {this.getDayOfWeek(currentWeek + index)}
                        </span>
                        <span className="month">
                          {this.getMonthOfWeek(currentWeek + index)}
                        </span>
                        <span className="date">
                          {this.getDateNumberOfWeek(currentWeek + index)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="timeline-nav-next">
                <a
                  className="text-nowrap"
                  href="#"
                  onClick={() => handleWeek('next')}
                >
                  {I18n.t('economy.listLabel.nextWeek')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
  activeStatus: state[REDUCER_NAME].activeStatus,
  currentWeek: state[REDUCER_NAME].currentWeek,
  position: state[REDUCER_NAME].position,
  filterDate: state[REDUCER_NAME].filterDate,
});

const mapDispatchToProps = dispatch => {
  return {
    setActiveDayInWeek: params => dispatch(setActiveDayInWeek(params)),
    setParamsEco: params => dispatch(setParamsEco(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeLine);
