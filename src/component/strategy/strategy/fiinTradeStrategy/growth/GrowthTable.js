import React from 'react';
import { REDUCER_NAME } from '../reducer';
import { connect } from 'react-redux';
import Table from '../../../../common/table/Table';
import Const from './Const';
import withScroll from '../../../../common/withScroll';
import { compose } from 'redux';
import { formatTextFloat } from '../../../../helpers/Text';
// import './Overview.scss';
class GrowthTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getDataFromRedux = state => state[REDUCER_NAME].listValueByIndex;

  getSchema = () => {
    return Object.keys(Const.value).map(item => {
      const key = Const.value[item];
      const title = `strategy.listValue.${item}`;
      const result = {
        key,
        title,
      };
      if (key === Const.value.timeRange) {
        return {
          ...result,
          render: (text, item) => (
            <div className="text-left">{item.timeRange}</div>
          ),
        };
      }
      if (key === Const.value.stockePicks) {
        return {
          ...result,
          thStyle: { textAlign: 'right' },
          render: (text, item) => {
            return <div>{formatTextFloat(item.stockPicks)}</div>;
          },
        };
      }
      if (key === Const.value.vnIndex) {
        return {
          ...result,
          thStyle: { textAlign: 'right' },
          render: (text, item) => {
            return <div>{formatTextFloat(item.vnIndex)}</div>;
          },
        };
      }

      return result;
    });
  };

  render() {
    const { ids, isFetching, table, height } = this.props;
    return (
      <div style={{ height: 110 }}>
        <Table
          table={table}
          resizable={true}
          columnDraggable={true}
          rowDraggable={false}
          getDataFromRedux={this.getDataFromRedux}
          isLoading={isFetching}
          ids={ids}
          schema={this.getSchema()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ids: state[REDUCER_NAME].listValue,
    listValueByIndex: state[REDUCER_NAME].listValueByIndex,
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
export default enhance(GrowthTable);
