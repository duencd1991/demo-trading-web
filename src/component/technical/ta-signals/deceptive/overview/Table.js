import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Table from '../../../../common/table/Table';
import TextBlink from '../../../../common/table/TextBlink';
import CellHover from '../../../../market/watchlist/summary/CellHover';
import { getColorPrice } from '../../../../helpers/Color';
import { getDataFollowKeyByDot } from '../../../../helpers/Common';
import {
  formatPrice,
  formatTextFloat,
  formatVolume,
} from '../../../../helpers/Text';
import { REDUCER_NAME } from '../reducer';
import Const from './Const';
import '../../../technical.scss';
import withScroll from './../../../../common/withScroll';
import { compose } from 'redux';
import TradingViewUrl from '../../../../common/TradingViewUrl';
import { I18n } from 'react-redux-i18n';

class TableOverview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      totalPage: 1,
      pageSize: 50,
    };
  }

  getDataFromRedux = state =>
    state[REDUCER_NAME].listObjectDeceptiveDataByTicker;

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
    if (nextProps.ids !== this.props.ids) {
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

      if (_.includes([listColumn.CE_FL], key)) {
        return {
          ...result,
          thStyle: { textAlign: 'center' },
          thTooltip: I18n.t('tasignals.overviewContent.ceflTooltip'),
          render: (text, item) => {
            if (text === true)
              return (
                <div className="text-center">
                  <span className="text-center text-s-color-3">
                    <i className="icon-remove-symbol" />
                  </span>
                </div>
              );
            else {
              return '';
            }
          },
        };
      }

      if (_.includes([listColumn.PRESSING], key)) {
        return {
          ...result,
          thStyle: { textAlign: 'center' },
          thTooltip: I18n.t('tasignals.overviewContent.pressingTooltip'),
          render: (text, item) => {
            if (text === true)
              return (
                <div className="text-center">
                  <span className="text-center text-s-color-3">
                    <i className="icon-remove-symbol" />
                  </span>
                </div>
              );
            else {
              return '';
            }
          },
        };
      }

      if (_.includes([listColumn.CANCELED], key)) {
        return {
          ...result,
          thStyle: { textAlign: 'center' },
          thTooltip: I18n.t('tasignals.overviewContent.cancelledTooltip'),
          render: (text, item) => {
            if (text === true) {
              return (
                <div className="text-center">
                  <span className="text-center text-s-color-3">
                    <i className="icon-remove-symbol" />
                  </span>
                </div>
              );
            } else {
              return '';
            }
          },
        };
      }

      if (_.includes([listColumn.AGGRESSIVE], key)) {
        return {
          ...result,
          thStyle: { textAlign: 'center' },
          thTooltip: I18n.t('tasignals.overviewContent.aggressiveTooltip'),
          render: (text, item) => {
            if (text === true) {
              return (
                <div className="text-center">
                  <span className="text-center text-s-color-3">
                    <i className="icon-remove-symbol" />
                  </span>
                </div>
              );
            } else {
              return '';
            }
          },
        };
      }

      if (_.includes([listColumn.CLOSING], key)) {
        return {
          ...result,
          thStyle: { textAlign: 'center' },
          thTooltip: I18n.t('tasignals.overviewContent.closingTooltip'),
          render: (text, item) => {
            if (text === true)
              return (
                <div className="text-center">
                  <span className="text-center text-s-color-3">
                    <i className="icon-remove-symbol" />
                  </span>
                </div>
              );
            else {
              return '';
            }
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
    return (
      <Table
        table={table}
        ids={ids}
        isLoading={isLoading}
        resizable={true}
        columnDraggable={false}
        rowDraggable={false}
        onScrollFunction={this.handleScroll}
        hideColumns={Const.listHideColumn}
        getDataFromRedux={this.getDataFromRedux}
        schema={this.schema(Const.listColumn, 'tasignals.overviewHeader')}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    ids: state[REDUCER_NAME].listDeceptiveDataTicker,
    isLoading: state[REDUCER_NAME].isLoading,
    totalPage: state[REDUCER_NAME].totalPage,
  };
};

const enhance = compose(
  withScroll(150, REDUCER_NAME),
  connect(mapStateToProps),
);

export default enhance(TableOverview);
