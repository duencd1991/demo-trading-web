import React from 'react';
import {
  REDUCER_NAME,
  intervalFetchPriceVolume,
  loadMorePriceVolume,
} from './reducer';
import { connect } from 'react-redux';
import Table from '../../../common/table/Table';
import Const from './Const';
import { getColorPrice } from '../../../helpers/Color';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import {
  formatPrice,
  formatTextFloat,
  formatVolume,
} from '../../../helpers/Text';
import withScroll from './../../../common/withScroll';
import { compose } from 'redux';
import TradingViewUrl from '../../../common/TradingViewUrl';

class PriceVolumeTable extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      page: 1,
      pageSize: Const.maxRowData,
    };
    this.state = this.initialState;
  }

  getDataFromRedux = state => state[REDUCER_NAME].listPriceVolumeByTicker;

  getClassName = (item, listColumn) => {
    return getColorPrice(
      getDataFollowKeyByDot(item, listColumn.price),
      getDataFollowKeyByDot(item, listColumn.ref_price),
      getDataFollowKeyByDot(item, listColumn.high_price),
      getDataFollowKeyByDot(item, listColumn.low_price),
      'text',
    );
  };

  handleScroll = e => {
    const { page } = this.state;
    const { totalPage } = this.props;
    const bottom =
      e.target.scrollHeight - Math.round(e.target.scrollTop) ===
      e.target.clientHeight;
    if (page === totalPage) return;
    if (this.props.ids.length < Const.maxRowData) return;
    if (bottom) {
      this.loadMoreActive();
    }
  };
  loadMoreActive = () => {
    const { page } = this.state;
    const {
      loadMorePriceVolume,
      totalPage,
      featureType,
      priceVolumeId,
      isLoading,
    } = this.props;
    if (page === totalPage || isLoading) return;
    this.setState(
      prevState => {
        return {
          page:
            prevState.page === totalPage ? prevState.page : prevState.page + 1,
        };
      },
      () => {
        const { page, pageSize } = this.state;
        loadMorePriceVolume({
          Page: page,
          PageSize: pageSize,
          featureType,
          priceVolumeId,
        });
      },
    );
  };

  getSchema = i18nTitleKey => {
    return Object.keys(Const.listColumn).map(item => {
      const key = Const.listColumn[item];
      const title = `${i18nTitleKey}.${item}`;
      const result = {
        key,
        title,
      };
      if (key === Const.listColumn.ticker) {
        return {
          ...result,
          render: text => (
            <div className="text-left">
              <TradingViewUrl
                code={getDataFollowKeyByDot(item, Const.listColumn.ticker)}
              />
              &nbsp;{text}
            </div>
          ),
        };
      }

      if (key === Const.listColumn.price) {
        return {
          ...result,
          thStyle: { textAlign: 'right' },
          render: (text, item) => {
            const className = this.getClassName(item, Const.listColumn);
            let styleDis = { display: 'block' };
            return (
              <div className={`${className} text-right`} style={styleDis}>
                <span>{formatTextFloat(formatPrice(text))}</span>
              </div>
            );
          },
        };
      }
      if (key === Const.listColumn.volume) {
        return {
          ...result,
          thStyle: { textAlign: 'right' },
          render: text => (
            <div className="text-right">
              {formatTextFloat(formatVolume(text))}
            </div>
          ),
        };
      }
      if (key === Const.listColumn.volume_expected) {
        return {
          ...result,
          thStyle: { textAlign: 'right' },
          render: text => (
            <div className="text-right">
              {formatTextFloat(formatVolume(text))}
            </div>
          ),
        };
      }
      if (key === Const.listColumn.nrOfDay) {
        return {
          ...result,
          thStyle: { textAlign: 'right' },
          render: text => (
            <div className="text-right"> {formatTextFloat(text, 0)}</div>
          ),
        };
      }
      if (key === Const.listColumn.lastClose) {
        return {
          ...result,
          thStyle: { textAlign: 'right' },
          render: text => (
            <div className="text-right">
              {formatTextFloat(formatPrice(text))}
            </div>
          ),
        };
      }
      if (key === Const.listColumn.lastVol) {
        return {
          ...result,
          thStyle: { textAlign: 'right' },
          render: text => (
            <div className="text-right">
              {formatTextFloat(formatVolume(text))}
            </div>
          ),
        };
      }
      if (key === Const.listColumn.RSI) {
        return {
          ...result,
          thStyle: { textAlign: 'right' },
          render: text => (
            <div className="text-right">{formatTextFloat(text, 2)}</div>
          ),
        };
      }
      if (key === Const.listColumn.ranking) {
        return {
          ...result,
          thStyle: { textAlign: 'center', width: 70 },
          render: (text, item) => {
            const width = `${(item.ranking / 5) * 100}%`;
            return (
              <div className="star-vote">
                <span className="star-real" style={{ width }}>
                  <i className="icon-star-fill" />
                </span>
                <span className="star-out">
                  <i className="icon-star-strock" />
                </span>
              </div>
            );
          },
        };
      }
      return result;
    });
  };

  render() {
    const { ids, isLoading, table } = this.props;

    return (
      <Table
        table={table}
        thValign="top"
        ref={ref => (this._div = ref)}
        resizable={true}
        isLoading={isLoading}
        columnDraggable={false}
        rowDraggable={false}
        // onScrollFunction={this.handleScroll}
        hideColumns={Const.listHideColumn}
        getDataFromRedux={this.getDataFromRedux}
        ids={ids}
        schema={this.getSchema('tasignals.priceVolumeHeader')}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    ids: state[REDUCER_NAME].listTickerPriceVolume,
    listPriceVolumeByTicker: state[REDUCER_NAME].listPriceVolumeByTicker,
    featureType: state[REDUCER_NAME].featureType,
    isLoading: state[REDUCER_NAME].isLoading,
    totalPage: state[REDUCER_NAME].totalPage,
    firstPage: state[REDUCER_NAME].firstPage,
    priceVolumeId: state[REDUCER_NAME].priceVolumeId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMorePriceVolume: params => dispatch(loadMorePriceVolume(params)),
    intervalFetchPriceVolume: featureType =>
      dispatch(intervalFetchPriceVolume(featureType)),
  };
};

const enhance = compose(
  withScroll(145, REDUCER_NAME),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(PriceVolumeTable);
