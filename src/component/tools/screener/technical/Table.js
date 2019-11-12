import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Table from '../../../common/table/Table';
import TextBlink from '../../../common/table/TextBlink';
import {
  candleStickCalculation,
  DOWN,
  UP,
} from '../../../helpers/CandleStickCalculation';
import { getColorPrice } from '../../../helpers/Color';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import {
  formatChange,
  formatPrice,
  formatTextFloat,
  formatVolume,
} from '../../../helpers/Text';
import CellHover from '../../../market/watchlist/summary/CellHover';
import { REDUCER_NAME, loadMoreData } from '../reducer';
import withScroll from './../../../common/withScroll';
import TradingViewUrl from '../../../common/TradingViewUrl';
import Const from './Const';

class TableTechnical extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 30,
    };
    this.tableRef = React.createRef();
  }

  getDataFromRedux = state =>
    state[REDUCER_NAME].listObjectScreenerDataByTicker;

  getClassName = (item, listColumn) => {
    return getColorPrice(
      getDataFollowKeyByDot(item, listColumn.PRICE),
      getDataFollowKeyByDot(item, listColumn.REF_PRICE),
      getDataFollowKeyByDot(item, listColumn.HIGH_PRICE),
      getDataFollowKeyByDot(item, listColumn.LOW_PRICE),
      'text',
    );
  };

  candleStickCal = (item, listColumn) => {
    return candleStickCalculation(
      getDataFollowKeyByDot(item, listColumn.HIGH_PRICE),
      getDataFollowKeyByDot(item, listColumn.LOW_PRICE),
      getDataFollowKeyByDot(item, listColumn.OPEN_PRICE),
      getDataFollowKeyByDot(item, listColumn.PRICE),
      getDataFollowKeyByDot(item, listColumn.H1),
      getDataFollowKeyByDot(item, listColumn.L1),
      getDataFollowKeyByDot(item, listColumn.O1),
      getDataFollowKeyByDot(item, listColumn.C1),
      getDataFollowKeyByDot(item, listColumn.H2),
      getDataFollowKeyByDot(item, listColumn.L2),
      getDataFollowKeyByDot(item, listColumn.O2),
      getDataFollowKeyByDot(item, listColumn.C2),
      getDataFollowKeyByDot(item, listColumn.SMA20),
      getDataFollowKeyByDot(item, listColumn.SMA20Past4),
    );
  };

  getTrend = trend => {
    if (trend === DOWN) {
      return <i className="icon-down fs-12 text-s-color-3" />;
    } else if (trend === UP) {
      return <i className="icon-up fs-12 text-s-color-5" />;
    }
  };

  handleScroll = e => {
    const { totalPage, loadMoreData, page, isLoading } = this.props;
    const bottom =
      e.target.scrollHeight - Math.round(e.target.scrollTop) ===
      e.target.clientHeight;
    if (page === totalPage || isLoading) return;

    if (bottom) {
      const newpage = page + 1;
      loadMoreData(newpage);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.page == 1) {
      this.resetScroll();
    }
  }

  resetScroll = () => {
    this.tableRef.current.scrollToTop();
  };

  schema = (listColumn, i18nTitleKey) => {
    return Object.keys(Const.listColumn).map((item, index) => {
      const key = listColumn[item];
      const title = `${i18nTitleKey}.${item}`;

      const result = {
        key,
        title,
      };

      if (index === 0) {
        return {
          ...result,
          render: (text, item) => {
            return (
              <CellHover isShowDeleteIcon={false}>
                <TextBlink item={item} tradingDate="tradingDate">
                  <TradingViewUrl code={item.stockScreenerItem.organCode} />
                  &nbsp;{text}
                </TextBlink>
              </CellHover>
            );
          },
        };
      }

      if (_.includes([listColumn.VOLUME], key)) {
        return {
          ...result,
          render: (text, item) => {
            return (
              <TextBlink item={item} tradingDate="tradingDate">
                {formatTextFloat(formatVolume(text))}
              </TextBlink>
            );
          },
        };
      }

      if (_.includes([listColumn.PRICE], key)) {
        return {
          ...result,
          render: (text, item) => {
            const className = this.getClassName(item, listColumn);
            return (
              <TextBlink
                item={item}
                tradingDate="tradingDate"
                className={className}
              >
                {formatTextFloat(formatPrice(text))}
              </TextBlink>
            );
          },
        };
      }

      if (_.includes([listColumn.PERCENT_PRICE_CHANGE], key)) {
        return {
          ...result,
          render: (text, item) => {
            const className = this.getClassName(item, listColumn);
            return (
              <TextBlink
                item={item}
                tradingDate="tradingDate"
                className={className}
              >
                {formatTextFloat(text * 100)}%
              </TextBlink>
            );
          },
        };
      }

      if (_.includes([listColumn.RSI], key)) {
        return {
          ...result,
          render: text => {
            return (
              <TextBlink item={item} tradingDate="tradingDate">
                {formatTextFloat(text)}
              </TextBlink>
            );
          },
        };
      }

      if (_.includes([listColumn.CANDLE_STICK], key)) {
        return {
          disableSort: true,
          ...result,
          thStyle: { textAlign: 'left' },
          render: (text, item) => {
            const candleStickData = this.candleStickCal(item, listColumn);
            const trend = this.getTrend(candleStickData.trend);
            return (
              <TextBlink
                item={item}
                tradingDate="tradingDate"
                className="text-left"
              >
                {candleStickData.candleStick} {trend}
              </TextBlink>
            );
          },
        };
      }

      return {
        ...result,
        render: text => (
          <TextBlink item={item} tradingDate="tradingDate">
            {formatTextFloat(text, 0)}
          </TextBlink>
        ),
      };
    });
  };

  render() {
    const { ids, isLoading, table } = this.props;
    return (
      <Table
        scrollRef={this.tableRef}
        table={table}
        isLoading={isLoading}
        ids={ids}
        resizable={true}
        columnDraggable={false}
        rowDraggable={false}
        onScrollFunction={this.handleScroll}
        hideColumns={Const.listHideColumn}
        getDataFromRedux={this.getDataFromRedux}
        schema={this.schema(
          Const.listColumn,
          'topBreakout.technical.technicalHeader',
        )}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    ids: state[REDUCER_NAME].listScreenerDataTicker,
    isLoading: state[REDUCER_NAME].isLoading,
    totalPage: state[REDUCER_NAME].totalPage,
    page: state[REDUCER_NAME].page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMoreData: page => dispatch(loadMoreData(page)),
  };
};

const enhance = compose(
  withScroll(360, REDUCER_NAME),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(TableTechnical);
