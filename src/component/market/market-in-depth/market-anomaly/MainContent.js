import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_NAME } from './reducer';
import Table from './Table';
import { Chart } from './chart';

const mapStateToProps = state => {
  return {
    isTable: state[REDUCER_NAME].isTable,
  };
};

export default connect(mapStateToProps)(MainContent);

function MainContent(props) {
  const { isTable } = props;

  return (
    <>
      {!isTable && (
        <div className="row w-100">
          <Chart />
        </div>
      )}
      {isTable && <Table />}
    </>
  );
}
