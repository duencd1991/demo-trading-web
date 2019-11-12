import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import Const from '../Const';
import Table from '../../../common/table/Table';
import moment from 'moment';
import {
  formatPrice,
  formatTextFloat,
  formatVolume,
  formatChange,
} from '../../../helpers/Text';
import { getColorPrice } from '../../../helpers/Color';
import { I18n } from 'react-redux-i18n';
import { REDUCER_NAME } from './../reducer';
import { withComponentId } from './../../../common/ComponentIdContext';
import { compose } from 'redux';
import withScroll from './../../../common/withScroll';

const getColorClassName = item => {
  return getColorPrice(
    getDataFollowKeyByDot(item, Const.listColumn.lastPrice),
    getDataFollowKeyByDot(item, Const.listColumn.referencePrice),
    getDataFollowKeyByDot(item, Const.listColumn.ceilingPrice),
    getDataFollowKeyByDot(item, Const.listColumn.floorPrice),
    'text',
  );
};
class TablePerformance extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sliceFrom: 0,
      sliceTo: 60,
      itemPerPage: 30,
      page: 1,
      totalPage: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { data = [] } = this.props;
    const { data: nextData = [] } = nextProps;

    if (data && nextData.length !== data.length) {
      this.getPaginationInfo(nextProps.data);
    }
  }

  getPaginationInfo = data => {
    const { itemPerPage } = this.state;
    const totalPage = data.length ? Math.ceil(data.length / itemPerPage) : 0;
    if (totalPage) this.setState({ totalPage });
  };

  handleLoadMore = () => {
    const { totalPage } = this.state;
    this.setState(prevState => {
      return {
        page:
          prevState.page === totalPage ? prevState.page : prevState.page + 1,
      };
    });
  };

  handleSliceTo = (page, sliceTo) => {
    const { data } = this.props;
    const { totalPage } = this.state;
    if (page === 1) return this.state.sliceTo;
    if (!totalPage) return sliceTo;
    if (page < totalPage) return page * sliceTo;
    return data.length;
  };

  handleScroll = e => {
    const { page, totalPage } = this.state;
    const bottom =
      e.target.scrollHeight - Math.round(e.target.scrollTop) ===
      e.target.clientHeight;
    if (page === totalPage) return;
    if (bottom) {
      this.handleLoadMore();
    }
  };

  render() {
    const { data = [], isFetching, table, height, isDerivatives } = this.props;
    const { page, itemPerPage } = this.state;
    const sliceToIndex = this.handleSliceTo(page, itemPerPage);
    const clone = data.map((item, index) => {
      return {
        ...item,
        id: index + 1,
      };
    });

    const listTransactionTime = clone
      .slice(0, sliceToIndex)
      .map(item => getDataFollowKeyByDot(item, 'id'));
    const listTransactionByTime = _.keyBy(clone, 'id');

    return (
      <Table
        table={{ ...table, height: Math.max(table.height, height - 5) }}
        onScrollFunction={this.handleScroll}
        stickyFirstColumn={false}
        hideColumns={[...Const.listHideColumn]}
        ids={listTransactionTime}
        isLoading={isFetching}
        resizeable={false}
        columnDraggable={false}
        rowDraggable={false}
        getDataFromRedux={() => {
          return listTransactionByTime;
        }}
        schema={Object.keys(Const.listColumn).map(item => {
          const key = Const.listColumn[item];
          const title = I18n.t(`timeAndSale.listTitleTable.${item}`);
          const result = {
            key,
            title,
          };

          if (key === Const.listColumn.time) {
            return {
              disableSort: true,
              ...result,
              thStyle: {
                width: '50px',
                textAlign: 'left',
              },
              render: text => (
                <div className="font-weight-light">
                  {moment(text).format('HH:mm:ss')}
                </div>
              ),
            };
          }
          if (key === Const.listColumn.type) {
            return {
              disableSort: true,
              ...result,
              thStyle: { textAlign: 'left', width: '50px' },
              render: text => {
                if (text === Const.typeList.bu) {
                  return (
                    <div className="text-s-color-5 text-left font-weight-bold">
                      {text}
                    </div>
                  );
                }
                if (text === Const.typeList.bu) {
                  return (
                    <div className="text-s-color-3 text-left font-weight-bold">
                      {text}
                    </div>
                  );
                }
                return <div className="text-left"> -- </div>;
              },
            };
          }
          if (key === Const.listColumn.lastPrice) {
            return {
              disableSort: true,
              ...result,
              thStyle: { textAlign: 'right' },
              render: (text, item) => {
                const className = getColorClassName(item);
                return (
                  <div className={`${className}  text-right font-weight-bold`}>
                    {formatTextFloat(isDerivatives ? text : formatPrice(text))}
                  </div>
                );
              },
            };
          }
          if (key === Const.listColumn.change) {
            return {
              disableSort: true,
              ...result,
              thStyle: { textAlign: 'right' },
              render: (text, item) => {
                const className = getColorClassName(item);
                return (
                  <div className={`${className}  text-right font-weight-bold`}>
                    {formatTextFloat(formatPrice(text))}
                  </div>
                );
              },
            };
          }
          if (key === Const.listColumn.percent1Dchange) {
            return {
              disableSort: true,
              ...result,
              thStyle: { textAlign: 'right' },
              render: (text, item) => {
                const className = getColorClassName(item);
                return (
                  <div className={`${className} text-right font-weight-bold`}>
                    {formatTextFloat(text * 100)}
                  </div>
                );
              },
            };
          }
          if (key === Const.listColumn.lastVolume) {
            return {
              disableSort: true,
              ...result,
              thStyle: { textAlign: 'right' },
              render: (text, item) => {
                return (
                  <div className={`text-right`}>
                    {formatTextFloat(formatVolume(text))}
                  </div>
                );
              },
            };
          }
          if (key === Const.listColumn.totalVolume) {
            return {
              disableSort: true,
              ...result,
              thStyle: { textAlign: 'right' },
              render: (text, item) => {
                return (
                  <div className={`text-right`}>
                    {formatTextFloat(formatVolume(text))}
                  </div>
                );
              },
            };
          }
          return result;
        })}
      />
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    id: componentId,
    i18n: state.i18n,
    isFetching: state[REDUCER_NAME].listMultiComponent[componentId].isFetching,
    data:
      state[REDUCER_NAME].listMultiComponent[componentId].timeAndSaleData
        .matches,
    isDerivatives:
      state[REDUCER_NAME].listMultiComponent[componentId].condition
        .isDerivatives,
  };
};

export default compose(
  withComponentId,
  connect(mapStateToProps),
  withScroll(125, REDUCER_NAME),
)(TablePerformance);
