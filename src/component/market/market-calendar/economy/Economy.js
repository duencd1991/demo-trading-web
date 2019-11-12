import React from 'react';
import EcoTable from '../economy/EcoTable';
import Filterimportance from './FilterImportance';
import SearchBox from './search-economy/SearchBox';
import TimeLine from './TimeLine';
import WeeklyView from './WeeklyView';
import moment from 'moment';
import {
  REDUCER_NAME,
  setActiveDayInWeek,
  setParamsEco,
  intercalFetchEconomy,
  cancelIntervalFetchEconomy,
  setActiveDayInWeekChangeTab,
} from '../reducer';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import Const from './Const';

const positionDay = {
  currentDate: moment().weekday(),
  firstDay: 1,
  mon: 0,
  fri: 4,
};

class Economy extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      listCheckBox: [
        {
          key: 'Low',
          value: true,
        },
        {
          key: 'Nomal',
          value: true,
        },
        {
          key: 'High',
          value: true,
        },
      ],
      from: '',
      to: '',
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      from: positionDay.mon,
      to: positionDay.fri,
    });
    this.props.setActiveDayInWeekChangeTab();
  }

  componentWillUnmount() {
    this.props.cancelIntervalFetchEconomy();
  }

  handleWeek = status => {
    const currentWeek =
      status === 'prev'
        ? this.props.currentWeek - 7
        : this.props.currentWeek + 7;
    const params = {
      activeStatus: false,
      position:
        currentWeek === 1 ? positionDay.currentDate : positionDay.firstDay,
      currentWeek,
      filterDate:
        currentWeek === 1
          ? moment()
              .day(moment().weekday() + 1)
              .format('dddd, MMMM DD, YYYY')
          : moment()
              .weekday(currentWeek - 1)
              .format('dddd, MMMM DD, YYYY'),
    };

    const paramsApi = {
      keyWord: this.props.keyWord,
      weekOfYear: moment()
        .weekday(currentWeek)
        .week(),
      year: moment()
        .weekday(currentWeek)
        .year(),
      page: Const.page,
      pageSize: Const.pageSize,
    };

    this.props.setParamsEco(paramsApi);
    this.props.setActiveDayInWeek(params);

    this.setState({ from: currentWeek - 1, to: currentWeek + 3 });
    this.props.intercalFetchEconomy(paramsApi);
  };

  handleChecked = key => {
    const clone = [...this.state.listCheckBox];
    const newClone = clone.map(item => {
      if (item.key === key) {
        return {
          ...item,
          value: !item.value,
        };
      }
      return item;
    });
    this.setState({ listCheckBox: newClone });
  };

  render() {
    const { listCheckBox, from, to } = this.state;
    return (
      <>
        <div className="tab-pane active" role="tabpanel">
          <div className="row w-100">
            <div className="col-8 list-filter">
              <SearchBox />
              <Filterimportance
                handleChecked={this.handleChecked}
                listCheckBox={listCheckBox}
              />
            </div>
          </div>
          <div>
            <TimeLine handleWeek={this.handleWeek} />
          </div>
          <div className="mt-10">
            <WeeklyView from={from} to={to} />
          </div>
          <div className="data-table-wrap mt-10">
            <div className="h-100">
              <EcoTable listCheckBox={listCheckBox} />
              <div className="unit-title-note" style={{ whiteSpace: 'nowrap' }}>
                {I18n.t('economy.listLabel.unitTitleNote')}
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
  weekOfYear: state[REDUCER_NAME].weekOfYear,
  year: state[REDUCER_NAME].year,
  keyWord: state[REDUCER_NAME].keyWord,
});

const mapDispatchToProps = dispatch => {
  return {
    setActiveDayInWeek: params => dispatch(setActiveDayInWeek(params)),
    setParamsEco: params => dispatch(setParamsEco(params)),
    intercalFetchEconomy: params => dispatch(intercalFetchEconomy(params)),
    cancelIntervalFetchEconomy: () => dispatch(cancelIntervalFetchEconomy()),
    setActiveDayInWeekChangeTab: () => dispatch(setActiveDayInWeekChangeTab()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Economy);
