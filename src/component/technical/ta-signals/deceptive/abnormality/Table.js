import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Table from '../../../../common/table/Table';
import TextBlink from '../../../../common/table/TextBlink';
import { getColorPrice } from '../../../../helpers/Color';
import { getDataFollowKeyByDot } from '../../../../helpers/Common';
import {
  formatPrice,
  formatTextFloat,
  formatVolume,
} from '../../../../helpers/Text';
import CellHover from '../../../../market/watchlist/summary/CellHover';
import '../../../technical.scss';
import { REDUCER_NAME } from '../reducer';
import Const from './Const';
import { I18n } from 'react-redux-i18n';
import withScroll from './../../../../common/withScroll';
import { compose } from 'redux';
import TradingViewUrl from '../../../../common/TradingViewUrl';

class TableAbnormality extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      totalPage: 1,
      pageSize: 50,
    };
  }

  getDataFromRedux = state =>
    state[REDUCER_NAME].listObjectDeceptiveAbnormalityDataByTicker;

  getClassName = (item, listColumn) => {
    return getColorPrice(
      getDataFollowKeyByDot(item, listColumn.PRICE),
      getDataFollowKeyByDot(item, listColumn.REF_PRICE),
      getDataFollowKeyByDot(item, listColumn.HIGH_PRICE),
      getDataFollowKeyByDot(item, listColumn.LOW_PRICE),
      'text',
    );
  };

  getPaginationInfo = () => {
    const { page, pageSize } = this.state;
    const { ids } = this.props;
    const toIndex = page * pageSize;
    if (ids.length === 0) return [];
    return ids.slice(0, toIndex);
  };

  handleScroll = e => {
    const { page } = this.state;
    const { totalPage } = this.props;
    const bottom =
      e.target.scrollHeight - Math.round(e.target.scrollTop) ===
      e.target.clientHeight;
    if (page === totalPage) return;
    if (bottom) {
      this.setState(prevState => {
        return {
          page:
            prevState.page === totalPage ? prevState.page : prevState.page + 1,
        };
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.ids != this.props.ids) {
      this.setState({ page: 1 });
    }
  }

  schema = (listColumn, i18nTitleKey) =>
    Object.keys(Const.listColumn).map((item, index) => {
      const key = listColumn[item];
      const title = `${i18nTitleKey}.${item}`;

      const result = {
        key,
        title,
      };

      if (index === 0) {
        return {
          ...result,
          render: (text, item) => (
            <CellHover isShowDeleteIcon={false}>
              <TextBlink item={item} tradingDate="tradingDate">
                <TradingViewUrl code={item.organCode} />
                &nbsp;{text}
              </TextBlink>
            </CellHover>
          ),
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

      if (_.includes([listColumn.VOLUME, listColumn.AVG_VOLUME], key)) {
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

      if (_.includes([listColumn.RATIO], key)) {
        return {
          ...result,
          render: (text, item) => {
            return (
              <TextBlink item={item} tradingDate="tradingDate">
                {formatTextFloat(text)}%
              </TextBlink>
            );
          },
        };
      }

      if (_.includes([listColumn.PREV_SESSION], key)) {
        return {
          ...result,
          render: (text, item) => {
            return (
              <TextBlink item={item} tradingDate="tradingDate">
                <span>{text}</span>
              </TextBlink>
            );
          },
        };
      }

      if (_.includes([listColumn.SESSION], key)) {
        return {
          ...result,
          render: (text, item) => {
            return (
              <TextBlink item={item} tradingDate="tradingDate">
                {text}
              </TextBlink>
            );
          },
        };
      }

      if (_.includes([listColumn.VOLUME_CE_FL_UNMATCHED], key)) {
        return {
          ...result,
          render: (text, item) => {
            const ce = getDataFollowKeyByDot(
              item,
              Const.listColumn.VOLUME_CE_UNMATCHED,
            );
            const fl = getDataFollowKeyByDot(
              item,
              Const.listColumn.VOLUME_FL_UNMATCHED,
            );
            return (
              <TextBlink item={item} tradingDate="tradingDate">
                <span>{formatTextFloat(ce / fl)}</span>
              </TextBlink>
            );
          },
        };
      }

      if (_.includes([listColumn.RANK], key)) {
        return {
          ...result,
          thStyle: { textAlign: 'center', width: 70 },
          render: (text, item) => {
            const width = `${(item.rank / 5) * 100}%`;
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

      return {
        ...result,
        render: text => text,
      };
    });

  render() {
    const { isLoading, table } = this.props;
    const ids = this.getPaginationInfo();
    if (ids.length === 0 && !isLoading) {
      return (
        <div
          style={{ height: 'calc(100vh - 420px)', minHeight: '10px' }}
          className="empty-data-msg text-s-color-3"
        >
          {I18n.t('tasignals.deceptiveDataMessage.noDataForFilter')}
        </div>
      );
    }
    return (
      <Table
        table={table}
        thValign="top"
        isLoading={isLoading}
        ids={ids}
        resizable={true}
        columnDraggable={false}
        onScrollFunction={this.handleScroll}
        rowDraggable={false}
        hideColumns={Const.listHideColumn}
        getDataFromRedux={this.getDataFromRedux}
        isShowHeadLoading={true}
        schema={this.schema(
          Const.listColumn,
          'tasignals.ceflAbnormalityHeader',
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    ids: state[REDUCER_NAME].listDeceptiveAbnormalityDataTicker,
    isLoading: state[REDUCER_NAME].isLoading,
    totalPage: state[REDUCER_NAME].totalPage,
  };
};

const enhance = compose(
  withScroll(175, REDUCER_NAME),
  connect(mapStateToProps),
);

export default enhance(TableAbnormality);
