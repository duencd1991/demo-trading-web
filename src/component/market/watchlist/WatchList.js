import React from 'react';
import Tab from '../../common/tab';
import { I18n } from 'react-redux-i18n';
import SearchAdd from './SearchAdd';
import Filter from './Filter';
import Create from './summary/Create';
import { connect } from 'react-redux';
import {
  changeTab,
  fetchListNewsData,
  fetchMyWatchList,
  REDUCER_NAME,
  setDateRangeOption,
  setFilterNewValue,
  subscribeRealtimeTickData,
} from './reducer';
import { includes } from 'lodash';
import moment from 'moment';

import TableIndex from './summary/TableIndex';
import Footer from '../../common/table/Footer';
import OrganizeColumnIndex from './summary/OrganizeColumnIndex';
import TableDerivative from './summary/TableDerivative';
import TablePutThroughHnx from './summary/TablePutThroughHnx';
import TablePutThroughUpcom from './summary/TablePutThroughUpcom';
import TablePutThroughHose from './summary/TablePutThroughHose';
import TableFundamental from './fundamental/Table';
import TablePerformance from './performance/Table';
import Technical from './technical/Technical';
import News from './news/News';
import PopupCalendar from './PopupCalendar';
import './index.scss';
import { ChanelConfig } from '../../../configs/GlobalConfig';
import ViewChart from './ViewChart';
import Chart from './chart/Chart';
import withPreRender from './../../common/withPreRender';
import ConfirmDeletePopup from './summary/ConfirmDeletePopup';
import ConfirmCreatePopup from './summary/ConfirmCreatePopup';
import ScrollComponent from './../../common/ScrollComponent';
import { compose } from 'redux';
import withRealtime from './../../common/withRealtime';
import ConstCommon from './../../common/Const';
import { Responsive } from '../../common/responsive';

class WatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilted: false,
      startDate: null,
      endDate: null,
    };
  }

  componentDidMount() {
    const { fetchMyWatchList } = this.props;
    fetchMyWatchList();
  }

  toggleFavorite = () => {
    const { setFilterNewValue } = this.props;
    this.setState(
      function(prevState) {
        return { isFilted: !prevState.isFilted };
      },
      () => {
        const { isFilted } = this.state;
        const key = isFilted ? 'isFavorite' : null;
        const value = isFilted ? true : null;
        setFilterNewValue(key, value);
      },
    );
  };

  getTypeSearch = () => {
    const {
      currentTab,
      watchListId,
      currentDerivative,
      currentPutThrough,
    } = this.props;
    if (currentTab === 3) {
      if (
        watchListId === currentDerivative ||
        watchListId === currentPutThrough
      )
        return 'Add';
      return 'Search';
    }
    return 'Add';
  };

  renderFooter = () => {
    const {
      watchListId,
      currentTab,
      currentDerivative,
      currentPutThrough,
      viewChart,
    } = this.props;

    return (
      ((!includes([2, 3, 4, 5], currentTab) && !viewChart) ||
        includes([currentPutThrough, currentDerivative], watchListId)) && (
        <Footer />
      )
    );
  };

  renderBody = () => {
    const {
      currentMyIndex,
      currentDefaultIndex,
      currentIndustry,
      watchListId,
      currentTab,
      currentDerivative,
      currentPutThrough,
      viewChart,
      component,
    } = this.props;

    if (watchListId === currentDerivative) {
      return (
        <div className="mt-3">
          <TableDerivative />
        </div>
      );
    }

    if (watchListId === currentPutThrough) {
      return (
        <div className="row mx--10 mt-3">
          <Responsive component={component} offsetWidth={40} margin={5}>
            {() => <TablePutThroughHose />}
            {() => <TablePutThroughHnx />}
            {() => <TablePutThroughUpcom />}
          </Responsive>
        </div>
      );
    }

    if (
      includes(
        [currentMyIndex, currentDefaultIndex, currentIndustry],
        watchListId,
      )
    ) {
      if (viewChart && currentTab === 1) {
        return <Chart />;
      }

      switch (currentTab) {
        case 1:
          return (
            <TableIndex isShowDeleteIcon={watchListId === currentMyIndex} />
          );

        case 2:
          return (
            <TableFundamental
              isShowDeleteIcon={watchListId === currentMyIndex}
            />
          );
        case 3:
          return <News />;
        case 4:
          return <Technical />;
        case 5:
          return (
            <TablePerformance
              isShowDeleteIcon={watchListId === currentMyIndex}
            />
          );
        default:
          return null;
      }
    }
  };

  renderTab = () => {
    const {
      currentMyIndex,
      currentDefaultIndex,
      currentIndustry,
      watchListId,
      currentTab,
      changeTab,
    } = this.props;

    return (
      <div>
        {includes(
          [currentMyIndex, currentDefaultIndex, currentIndustry],
          watchListId,
        ) && (
          <Tab
            currentTab={currentTab}
            listTab="watchListCommon.tab"
            changeTab={changeTab}
          />
        )}
      </div>
    );
  };

  renderRightTab = () => {
    const {
      currentMyIndex,
      currentDefaultIndex,
      currentIndustry,
      watchListId,
      currentTab,
    } = this.props;

    if (
      includes(
        [currentMyIndex, currentDefaultIndex, currentIndustry],
        watchListId,
      ) &&
      currentTab === 1
    ) {
      return (
        <div className="group-btn-right text-right pr-0 text-nowrap">
          <ViewChart />
          <Create />
          <OrganizeColumnIndex />
        </div>
      );
    }
  };

  renderListFilter = () => {
    const {
      currentMyIndex,
      watchListId,
      currentTab,
      dateRangeOption,
    } = this.props;

    return (
      <div className="list-filter">
        <SearchAdd
          disabled={watchListId !== currentMyIndex && currentTab !== 3}
          typeSearch={this.getTypeSearch()}
          dateRangeOption={dateRangeOption}
          isBelongToWatchList
        />
        <Filter />
      </div>
    );
  };

  renderCalendar = () => {
    const {
      currentMyIndex,
      currentDefaultIndex,
      currentIndustry,
      watchListId,
      currentTab,
      setDateRangeOption,
      dateRangeOption,
      fetchListNewsData,
    } = this.props;

    return (
      currentTab === 3 &&
      includes(
        [currentMyIndex, currentDefaultIndex, currentIndustry],
        watchListId,
      ) && (
        <div className="d-flex mb-10 align-items-center justify-content-between">
          <div>
            {dateRangeOption.FromDate && (
              <div className="date-range-title d-flex">
                <div className="date-range-title--sub-text">From</div>
                <div className="date-range-title--main-text">{`${moment(
                  dateRangeOption.FromDate,
                ).format('dddd, MMMM DD, YYYY')}`}</div>
                <div className="date-range-title--sub-text">to</div>
                <div className="date-range-title--main-text">{`${moment(
                  dateRangeOption.ToDate,
                ).format('dddd, MMMM DD, YYYY')}`}</div>
              </div>
            )}
          </div>
          <div
            style={{
              position: 'relative',
              width: '100%',
              textAlign: 'right',
            }}
          >
            <div className="d-flex float-right Calendar-right">
              <PopupCalendar
                isDateSelected={
                  dateRangeOption.FromDate || dateRangeOption.ToDate
                }
                setDateRangeOption={setDateRangeOption}
                fetchListNewsData={fetchListNewsData}
              />
              <a href="#" onClick={this.toggleFavorite} className={`btn btn-cus-nomal bg-b-color-3 ml-5 ${this.state.isFilted ? 'active' : ''}`}>
                {I18n.t('watchListNews.listTitleTable.FAVORITE')}
              </a>
            </div>
          </div>
        </div>
      )
    );
  };

  renderTabAndRightTab = () => {
    const { watchListId, currentDerivative, currentPutThrough } = this.props;

    return (
      !includes([currentDerivative, currentPutThrough], watchListId) && (
        <div className="d-flex mt-10 w-100 ml-0 mr-0 justify-content-between">
          {this.renderTab()}
          {this.renderRightTab()}
        </div>
      )
    );
  };

  render() {
    const { isFetching } = this.props;

    return (
      <div className={`watchlist-wrapper h-100 ${isFetching ? 'bg-blur' : ''}`}>
        <ConfirmDeletePopup />
        <ConfirmCreatePopup />
        <ScrollComponent>
          <div className="top-nav pl-20 pr-20 pt-8">
            <div className="w-100">{this.renderListFilter()}</div>
            {this.renderTabAndRightTab()}
            {this.renderCalendar()}
            <div className="tab-content">
              <div className="tab-pane active">
                {this.renderBody()}
                {this.renderFooter()}
              </div>
            </div>
          </div>
        </ScrollComponent>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    currentTab: state[REDUCER_NAME].currentTab,
    currentMyIndex: state[REDUCER_NAME].currentMyIndex,
    currentDefaultIndex: state[REDUCER_NAME].currentDefaultIndex,
    currentIndustry: state[REDUCER_NAME].currentIndustry,
    currentDerivative: state[REDUCER_NAME].currentDerivative,
    currentPutThrough: state[REDUCER_NAME].currentPutThrough,
    watchListId: state[REDUCER_NAME].watchListId,
    dateRangeOption: state[REDUCER_NAME].dateRangeOption,
    viewChart: state[REDUCER_NAME].viewChart,
    isFetching: state[REDUCER_NAME].isFetching,
    component: state[REDUCER_NAME].component,
  };
};

const mapDispatchToProps = {
  changeTab,
  fetchMyWatchList,
  setFilterNewValue,
  setDateRangeOption,
  fetchListNewsData,
  subscribeRealtimeTickData,
};

export default compose(
  withPreRender(ConstCommon.listComponent.Watchlist),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRealtime(ChanelConfig.TickChanel, 'subscribeRealtimeTickData'),
)(WatchList);
