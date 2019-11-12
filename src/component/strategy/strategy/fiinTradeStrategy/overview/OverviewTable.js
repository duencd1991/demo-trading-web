import React from 'react';
import { REDUCER_NAME } from '../reducer';
import { connect } from 'react-redux';
import Table from '../../../../common/table/Table';
import Const from '../Const';
import withScroll from '../../../../common/withScroll';
import { compose } from 'redux';
import HeaderTable from '../../../../common/mixTable/headerTable/HeaderTable';
import { formatPercent, formatTextFloat } from '../../../../helpers/Text';
import './Overview.scss';
import { getDataFollowKeyByDot } from '../../../../helpers/Common';
import TradingViewUrl from '../../../../common/TradingViewUrl';

class OverviewTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getDataFromRedux = state => state[REDUCER_NAME].listOverviewByTicker;

  getSchema = () => {
    const getClassName = item => {
      console.log(item, 'item');
      // check color of item eventype
      return item < 0 ? 'isRed' : '';
    };

    return Object.keys(Const.overvew.listOverviewTable).map(item => {
      const key = Const.overvew.listOverviewTable[item];
      const title = `strategy.listOverviewTable.${item}`;
      const result = {
        key,
        title,
      };
      if (key === Const.overvew.listOverviewTable.ticker) {
        return {
          ...result,
          render: (text, item) => (
            <div className="text-left">
              <TradingViewUrl
                code={getDataFollowKeyByDot(item, Const.organCode)}
              />
              &nbsp;{item.organCode}
            </div>
          ),
        };
      }
      if (key === Const.overvew.listOverviewTable.roe) {
        return {
          ...result,
          thStyle: { textAlign: 'right' },
          render: (text, item) => {
            return <div>{formatPercent(item.roe) + '%'}</div>;
          },
        };
      }
      if (key === Const.overvew.listOverviewTable.roa) {
        return {
          ...result,
          thStyle: { textAlign: 'right' },
          render: (text, item) => {
            return <div>{formatPercent(item.roa) + '%'}</div>;
          },
        };
      }
      if (key === Const.overvew.listOverviewTable.pe) {
        return {
          ...result,
          thStyle: { textAlign: 'right' },
          render: (text, item) => {
            return (
              <div className={getClassName(item.pe)}>
                {formatTextFloat(item.pe)}
              </div>
            );
          },
        };
      }
      if (key === Const.overvew.listOverviewTable.pb) {
        return {
          ...result,
          thStyle: { textAlign: 'right' },
          render: (text, item) => {
            return <div>{formatTextFloat(item.pb)}</div>;
          },
        };
      }

      return result;
    });
  };

  render() {
    const {
      ids,
      isFetching,
      table,
      titleHeaderTable,
      colorLeft,
      colorRight,
    } = this.props;
    console.log(ids, 'rrrrrrrrrrrrrrrrrrrrrr');
    return (
      <div>
        <HeaderTable
          title={titleHeaderTable}
          colorLeft={colorLeft || null}
          colorRight={colorRight || null}
        />
        <div className="tab-pane active" role="tabpanel">
          <Table
            table={{ height: 144 }}
            resizable={true}
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
    ids: state[REDUCER_NAME].listOverview,
    listOverviewByTicker: state[REDUCER_NAME].listOverviewByTicker,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const enhance = compose(
  withScroll(200, REDUCER_NAME),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);
export default enhance(OverviewTable);
