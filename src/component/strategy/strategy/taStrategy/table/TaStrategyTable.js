import React from 'react';
import { connect } from 'react-redux';
import Table from '../../../../common/table/Table';
import TextBlink from '../../../../common/table/TextBlink';
import { I18n } from 'react-redux-i18n';
import withScroll from './../../../../common/withScroll';
import { compose } from 'redux';
import Const from './../Const';
import { REDUCER_NAME } from '../reducer';

class TaStrategyTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      totalPage: 1,
      pageSize: 50,
    };
  }

  getIds = () => {
    const { listDataTable } = this.props;
    return listDataTable;
  };

  getDataFromRedux = () => {
    return state => state[REDUCER_NAME].listDataTableById;
  };

  getSchema = () => {
    //const { bottom } = this.state;
    const ZERO_VALUE = 0;
    const { title: tabTitle, schemaKey } = this.props;

    return Object.keys(schemaKey).map((item, index) => {
      const key = schemaKey[item];
      const title = `${tabTitle}.${item}`;
      const result = {
        key,
        title,
      };

      return {
        ...result,
        render: text => text,
      };
    });
  };

  render() {
    //const { height } = this.props;
    return (
      <Table
        //table={{height}}
        thValign="top"
        //isLoading={isLoading}
        ids={this.getIds()}
        resizable={true}
        columnDraggable={false}
        // onScrollFunction={this.handleScroll}
        rowDraggable={false}
        //hideColumns={Const.listHideColumn}
        getDataFromRedux={this.getDataFromRedux()}
        schema={this.getSchema()}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    listDataTable: state[REDUCER_NAME].listDataTable,
  };
};

const enhance = compose(
  withScroll(160, REDUCER_NAME),
  connect(mapStateToProps),
);

export default enhance(TaStrategyTable);
