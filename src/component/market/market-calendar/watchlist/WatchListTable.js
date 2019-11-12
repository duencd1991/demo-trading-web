import React from 'react';
import {
  changeTab,
  intervalFetchWatchList,
  loadMoreWatchList,
  REDUCER_NAME,
} from '../reducer';
import { connect } from 'react-redux';
import moment from 'moment';
import Table from '../../../common/table/Table';
import Const from './Const';
import withScroll from './../../../common/withScroll';
import { compose } from 'redux';
import { SimpleTooltip } from './../../../common/tooltip';
import { I18n } from 'react-redux-i18n';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import TradingViewUrl from '../../../common/TradingViewUrl';

const valText = '--';

class WatchListTable extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      page: 1,
      pageSize: 50,
    };
    this.state = this.initialState;
    this.tableRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page === 1) {
      this.resetScroll();
      this.setState({ ...this.initialState });
      // check filter have value then user remove then reset state
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { watchListId, watchlistType, eventType } = this.props;
    if (watchListId !== prevProps.watchListId) {
      this.resetScroll();
      this.props.intervalFetchWatchList(eventType, watchlistType, watchListId);
    }
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      console.log(this.props.i18n.locale);
      this.props.intervalFetchWatchList(eventType, watchlistType, watchListId);
    }
  }

  resetScroll = () => {
    this.tableRef.current.scrollToTop();
  };

  getDataFromRedux = state => state[REDUCER_NAME].listWatchListByTicker;

  getTextEventType = item => {
    if (
      item === Const.eventType.Earning.KQCT ||
      item === Const.eventType.Earning.KQQY ||
      item === Const.eventType.Earning.KQSB
    ) {
      return Const.textEventType.ERN;
    }
    if (
      item === Const.eventType.Share.ISS ||
      item === Const.eventType.Share.AIS
    ) {
      return Const.textEventType.SIS;
    }
    if (
      item === Const.eventType.Dividend.DIV ||
      item === Const.eventType.Dividend.CDIV
    ) {
      return Const.textEventType.DIV;
    }
    if (
      item === Const.eventType.AGM.AGME ||
      item === Const.eventType.AGM.EGME
    ) {
      return Const.textEventType.AGM;
    }
    if (item === Const.eventType.IPO.NLIS) {
      return Const.textEventType.IPO;
    }
    return '';
  };

  getSchema = () => {
    const getClassName = item => {
      // check color of item eventype
      const type = 'pt-1 badge bg';
      if (item === Const.eventType.IPO.NLIS) {
        return `${type}-bo-color-1`;
      }
      if (
        item === Const.eventType.Earning.KQCT ||
        item === Const.eventType.Earning.KQQY ||
        item === Const.eventType.Earning.KQSB
      ) {
        return `${type}-l-color-3`;
      }
      if (
        item === Const.eventType.Share.ISS ||
        item === Const.eventType.Share.AIS
      ) {
        return `${type}-c-color-3`;
      }
      if (
        item === Const.eventType.Dividend.DIV ||
        item === Const.eventType.Dividend.CDIV
      ) {
        return `${type}-s-color-4`;
      }
      if (
        item === Const.eventType.AGM.AGME ||
        item === Const.eventType.AGM.EGME
      ) {
        return `${type}-s-color-3`;
      }
      return `${type}-s-color-6`;
    };
    return Object.keys(Const.listColumn).map(item => {
      const key = Const.listColumn[item];
      const title = `watchlistCalendar.lstWatchlist.${item}`;
      const result = {
        key,
        title,
      };
      if (key === Const.listColumn.ticker) {
        return {
          ...result,
          render: (text, item) => (
            <div className="text-left">
              <TradingViewUrl
                code={getDataFollowKeyByDot(item, Const.listColumn.ticker)}
              />
              &nbsp;{item.ticker}
            </div>
          ),
        };
      }
      if (key === Const.listColumn.anDate) {
        return {
          ...result,
          thStyle: { textAlign: 'left' },
          render: text => {
            return text ? (
              <div className="text-left font-weight-light">
                {moment(text).format('MM/DD/YYYY')}
              </div>
            ) : (
              <div className="text-left">{''}</div>
            );
          },
        };
      }
      if (key === Const.listColumn.title) {
        return {
          disableSort: true,
          ...result,
          thStyle: { textAlign: 'left' },
          render: (text, item) => {
            return text ? (
              <div className="text-left">
                {item.sourceUrl ? (
                  <SimpleTooltip
                    message={
                      <span>
                        URL:{' '}
                        <a href={item.sourceUrl} target="_blank">
                          {item.sourceUrl.substring(0, 25)}
                        </a>
                      </span>
                    }
                    position={'right'}
                    isLight={true}
                  >
                    {text}
                  </SimpleTooltip>
                ) : (
                  <SimpleTooltip
                    message={
                      <span>{I18n.t('watchlistCalendar.notAvailable')}</span>
                    }
                    position={'right'}
                    isLight={true}
                  >
                    {text}
                  </SimpleTooltip>
                )}
              </div>
            ) : (
              <div className="text-left" />
            );
          },
        };
      }
      if (key === Const.listColumn.recordDate) {
        return {
          disableSort: true,
          ...result,
          thStyle: { textAlign: 'left' },
          render: text => {
            return text !== valText ? (
              <div className="text-left font-weight-light">
                {moment(text).format('MM/DD/YYYY')}
              </div>
            ) : (
              <div className="text-left" />
            );
          },
        };
      }
      if (key === Const.listColumn.ex) {
        return {
          disableSort: true,
          ...result,
          thStyle: { textAlign: 'left' },
          render: text => {
            return text !== valText ? (
              <div className="text-left font-weight-light">
                {moment(text).format('MM/DD/YYYY')}
              </div>
            ) : (
              <div className="text-left">{''}</div>
            );
          },
        };
      }
      if (key === Const.listColumn.excercise) {
        return {
          ...result,
          thStyle: { textAlign: 'left' },
          render: text => {
            return text !== valText ? (
              <div className="text-left font-weight-light">
                {moment(text).format('MM/DD/YYYY')}
              </div>
            ) : (
              <div className="text-left">{''}</div>
            );
          },
        };
      }
      if (key === Const.listColumn.eventType) {
        return {
          disableSort: true,
          ...result,
          thStyle: { textAlign: 'center', width: '3%' },
          render: text => {
            let classColor = getClassName(text);
            let styleDis = { display: 'block' };
            return (
              <div className={`${classColor} text-center`} style={styleDis}>
                <span>{this.getTextEventType(text)}</span>
              </div>
            );
          },
        };
      }
      if (key === Const.listColumn.reference) {
        return {
          disableSort: true,
          ...result,
          thStyle: { textAlign: 'left' },
          render: text => {
            return text !== valText ? (
              <div className="text-center">{text}</div>
            ) : (
              <div className="text-center" />
            );
          },
        };
      }

      return result;
    });
  };

  //catching event scroll table
  handleScroll = e => {
    const bottom =
      e.target.scrollHeight - Math.round(e.target.scrollTop) ===
      e.target.clientHeight;
    if (this.props.ids.length < 20) return;
    // if list item less than 20 disable load more
    if (bottom) {
      this.loadmoreActive();
    }
  };

  loadmoreActive = () => {
    const {
      loadMoreWatchList,
      isFetching,
      totalPage,
      eventType,
      watchlistType,
      watchListId,
      fromPublicDate,
      toPublicDate,
      fromExrightDate,
      toExrightDate,
      fromRecordDate,
      toRecordDate,
      fromExerciseDate,
      toExerciseDate,
      page,
    } = this.props;
    if (page === totalPage || isFetching) return;
    this.setState(() => {
      const { pageSize } = this.state;
      loadMoreWatchList({
        Page: page + 1,
        PageSize: pageSize,
        eventType,
        watchlistType,
        watchListId,
        fromPublicDate,
        toPublicDate,
        fromExrightDate,
        toExrightDate,
        fromRecordDate,
        toRecordDate,
        fromExerciseDate,
        toExerciseDate,
      });
    });
  };

  render() {
    const { ids, isFetching, table } = this.props;
    return (
      <div
        className="tab-content"
        style={{ height: 'calc(100% - 110px)', clear: 'both' }}
      >
        <div className="tab-pane active" role="tabpanel">
          <Table
            table={table}
            scrollRef={this.tableRef}
            hideColumns={[Const.listColumn.sourceUrl]}
            resizable={true}
            onScrollFunction={this.handleScroll}
            columnDraggable={true}
            rowDraggable={false}
            getDataFromRedux={this.getDataFromRedux}
            isLoading={isFetching}
            ids={ids}
            schema={this.getSchema()}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    ids: state[REDUCER_NAME].lstTickerWatchList,
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
    isFetching: state[REDUCER_NAME].isFetching,
    totalPage: state[REDUCER_NAME].totalPage,
    firstPage: state[REDUCER_NAME].firstPage,
    page: state[REDUCER_NAME].page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeTab: currentTab => dispatch(changeTab(currentTab)),
    loadMoreWatchList: params => dispatch(loadMoreWatchList(params)),
    intervalFetchWatchList: (eventType, watchlistType, watchListId) =>
      dispatch(intervalFetchWatchList(eventType, watchlistType, watchListId)),
  };
};

const enhance = compose(
  withScroll(180, REDUCER_NAME),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);
export default enhance(WatchListTable);
