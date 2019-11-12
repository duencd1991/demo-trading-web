import React from 'react';
import { connect } from 'react-redux';

const withScroll = (offsetHeight, REDUCER_NAME) => (WrappedComponent) => {
  class Scroll extends React.Component {

    state = {
      table: {}
    };

    calculateSize = (component) => {
      const { countTable, offsetTable } = this.props;

      let height = 0;
      if (component) {
        height = component.height - offsetHeight;
        if (countTable) {
          height = height / countTable;
        }
        if (offsetTable) {
          height -= offsetTable;
        }
      }

      this.setState({ ...this.state, table: { height } });
    };

    componentDidMount() {
      this.calculateSize(this.props.component);
    }

    componentWillReceiveProps(nextProps, nextContext) {
      const { component } = this.props;
      if (component !== nextProps.component) {
        this.calculateSize(nextProps.component);
      }
    }

    render() {
      return (
        <WrappedComponent {...this.props} table={this.state.table}/>
      );
    }
  }

  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  Scroll.displayName = `withScroll(${wrappedComponentName})`;

  const mapStateToProps = (state, { id }) => {
    return {
      component: id ? state[REDUCER_NAME].listMultiComponent[id].component : state[REDUCER_NAME].component
    };
  };

  return connect(mapStateToProps)(Scroll);
};

export default withScroll;
