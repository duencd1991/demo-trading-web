import React from 'react';
import { connect } from 'react-redux';
import Table from '../../../common/table/Table';
import { REDUCER_NAME } from './reducer';
import _ from 'lodash';
import withScroll from './../../../common/withScroll';
import { compose } from 'redux';

class TableCanslim extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {};
    this.state = this.initialState;
  }

  getIds = () => {
    const { listDataTable } = this.props;
    return listDataTable;
  };

  getDataFromRedux = () => {
    return state => state[REDUCER_NAME].listDataTableById;
  };

  getSchema = () => {
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
    return (
      <Table
        thValign="top"
        ids={this.getIds()}
        resizable={true}
        columnDraggable={false}
        rowDraggable={false}
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

export default enhance(TableCanslim);
