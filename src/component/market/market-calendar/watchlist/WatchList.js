import React from 'react';
import _ from 'lodash';
import DropDownEvenType from '../watchlist/DropDownEvenType';
import WatchListTable from '../watchlist/WatchListTable';
import WatchListDate from './WatchListDateThemeNew';
import DropdownWatchList from '../watchlist/DropdownWatchList';
import {
  REDUCER_NAME,
  changeGetData,
  cancelIntervalFetchWatchList,
  fetchListTicker,
} from '../reducer';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

class WatchList extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      applyBtnClicked: false,
      resetBtnClicked: false,
      listDatePicker: [
        {
          id: 1,
          value: {
            from: null,
            to: null,
            nameFrom: 'anDate',
          },
        },
        {
          id: 2,
          value: {
            from: null,
            to: null,
            nameFrom: 'recordDate',
          },
        },
        {
          id: 3,
          value: {
            from: null,
            to: null,
            nameFrom: 'exRightDate',
          },
        },
        {
          id: 4,
          value: {
            from: null,
            to: null,
            nameFrom: 'excerciseDate',
          },
        },
      ],
    };
    this.state = this.initialState;
    this.handleButtonApplyPress = this.handleButtonApplyPress.bind(this);
    this.handleButtonResetPress = this.handleButtonResetPress.bind(this);
    this.handleButtonUp = this.handleButtonUp.bind(this);
  }

  componentDidMount() {
    this.props.fetchListTicker();
  }

  componentWillUnmount() {
    this.props.cancelIntervalFetchWatchList();
  }

  resetState = () => {
    this.setState({ ...this.initialState });
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.watchListId !== this.props.watchListId ||
      nextProps.eventType !== this.props.eventType
    ) {
      this.resetState();
    }
  }

  handleDateChange = itemDate => {
    // set state date change
    const clone = [...this.state.listDatePicker];
    const newClone = clone.map(item => {
      if (item.id === itemDate.keyId) {
        return {
          ...item,
          value: {
            ...item.value,
            from: itemDate.startDate,
            to: itemDate.endDate,
          },
        };
      }
      return item;
    });
    this.setState({ listDatePicker: newClone });
    if (itemDate.startDate !== null || itemDate.endDate !== null) {
      this.getDataToDate(newClone);
    }
  };

  getDataToDate = listDate => {
    const publicDate = listDate[0].value.from;
    const toPublic = listDate[0].value.to;
    const record = listDate[1].value.from;
    const toRecord = listDate[1].value.to;
    const exRight = listDate[2].value.from;
    const toExRigth = listDate[2].value.to;
    const excercise = listDate[3].value.from;
    const toExcercise = listDate[3].value.to;

    this.props.changeGetData(
      publicDate,
      toPublic,
      exRight,
      toExRigth,
      record,
      toRecord,
      excercise,
      toExcercise,
    );
  };

  ClickReset = () => {
    this.resetState();
    this.props.changeGetData();
  };

  handleButtonApplyPress() {
    this.setState({ applyBtnClicked: true });
  }

  handleButtonResetPress() {
    this.setState({ resetBtnClicked: true });
  }

  handleButtonUp() {
    this.setState({ applyBtnClicked: false, resetBtnClicked: false });
  }

  render() {
    const { listDatePicker } = this.state;
    return (
      <div className="filter-list-wacalendar h-100">
        <div className="filter-watch ">
          <DropdownWatchList />
        </div>
        <div className="list-date">
          <div className="w-l-first">
            <DropDownEvenType />
          </div>
          <div className="w-l-mid">
            {/* {this.state.listDatePicker.map(item => (
              <WatchListDate
                key={item.id}
                keyId={item.id}
                nameFrom={item.value.nameFrom}
                handleDateChange={this.handleDateChange}
                startDate={item.value.from}
                endDate={item.value.to}
              />
            ))} */}
            <div className="a1">
              <WatchListDate
                key={listDatePicker[0].id}
                keyId={listDatePicker[0].id}
                nameFrom={listDatePicker[0].value.nameFrom}
                handleDateChange={this.handleDateChange}
                startDate={listDatePicker[0].value.from}
                endDate={listDatePicker[0].value.to}
              />
              <WatchListDate
                key={listDatePicker[2].id}
                keyId={listDatePicker[2].id}
                nameFrom={listDatePicker[2].value.nameFrom}
                handleDateChange={this.handleDateChange}
                startDate={listDatePicker[2].value.from}
                endDate={listDatePicker[2].value.to}
              />
            </div>
            <div className="a2">
              <WatchListDate
                key={listDatePicker[1].id}
                keyId={listDatePicker[1].id}
                nameFrom={listDatePicker[1].value.nameFrom}
                handleDateChange={this.handleDateChange}
                startDate={listDatePicker[1].value.from}
                endDate={listDatePicker[1].value.to}
              />

              <WatchListDate
                key={listDatePicker[3].id}
                keyId={listDatePicker[3].id}
                nameFrom={listDatePicker[3].value.nameFrom}
                handleDateChange={this.handleDateChange}
                startDate={listDatePicker[3].value.from}
                endDate={listDatePicker[3].value.to}
              />
            </div>
          </div>
          <div className="w-l-last">
            <button
              className={`btn btn-cus-nomal bg-b-color-3 ${this.state
                .resetBtnClicked && 'active'}`}
              onClick={this.ClickReset}
              onMouseDown={this.handleButtonResetPress}
              onMouseUp={this.handleButtonUp}
            >
              {I18n.t('watchlistCalendar.reset')}
            </button>
          </div>
        </div>
        <div className="mt-10">
          <WatchListTable />
        </div>
      </div>
    );
  }
}

// export default WatchList;
const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    eventType: state[REDUCER_NAME].eventType,
    watchlistType: state[REDUCER_NAME].watchlistType,
    watchListId: state[REDUCER_NAME].watchListId,
    fromPublicDate: state[REDUCER_NAME].fromPublicDate,
    toPublicDate: state[REDUCER_NAME].toPublicDate,
    fromExrightDate: state[REDUCER_NAME].fromExrightDate,
    toExrightDate: state[REDUCER_NAME].toExrightDate,
    fromRecordDate: state[REDUCER_NAME].fromRecordDate,
    toRecordDate: state[REDUCER_NAME].toRecordDate,
    fromExerciseDate: state[REDUCER_NAME].fromExerciseDate,
    toExerciseDate: state[REDUCER_NAME].toExerciseDate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeGetData: (
      fromPublicDate,
      toPublicDate,
      fromExrightDate,
      toExrightDate,
      fromRecordDate,
      toRecordDate,
      fromExerciseDate,
      toExerciseDate,
    ) =>
      dispatch(
        changeGetData(
          fromPublicDate,
          toPublicDate,
          fromExrightDate,
          toExrightDate,
          fromRecordDate,
          toRecordDate,
          fromExerciseDate,
          toExerciseDate,
        ),
      ),
    cancelIntervalFetchWatchList: () =>
      dispatch(cancelIntervalFetchWatchList()),
    fetchListTicker: () => dispatch(fetchListTicker()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WatchList);
