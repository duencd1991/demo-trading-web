import React from 'react';
import Table from './table';
import Responsive from '../../common/responsive/Responsive';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { REDUCER_NAME } from './reducer';
import { withComponentId } from './../../common/ComponentIdContext';
import BarChart from './BarChart';

class Content extends React.Component {
  state = {
    tableHeight: 0,
  };
  onSize = size => {
    this.setState({ tableHeight: size.height });
  };

  render() {
    const { component, componentId } = this.props;
    return (
      <Responsive
        component={component}
        margin={5}
        offsetWidth={40}
        XS_SIZE={600}
      >
        {width => (
          <BarChart
            width={width}
            componentId={componentId}
            onSize={this.onSize}
          />
        )}
        {width => (
          <div className="ts-table" style={{ width }}>
            <Table height={this.state.tableHeight} />
          </div>
        )}
      </Responsive>
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    component: state[REDUCER_NAME].listMultiComponent[componentId].component,
  };
};

export default compose(
  withComponentId,
  connect(mapStateToProps),
)(Content);
