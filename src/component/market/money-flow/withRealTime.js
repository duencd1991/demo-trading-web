import React from 'react';
import PropTypes from 'prop-types';

const INTERVAL_TIME = 300000; //5 minute

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withRealTime = (Component) => {
  class WithRealTime extends React.PureComponent {
    static propTypes = {
      fetchData: PropTypes.func.isRequired,
    };

    componentDidMount() {
      this.getData();
      this.intervalGetData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      const { comGroupCode } = this.props;
      if (comGroupCode !== prevProps.comGroupCode) {
        clearInterval(this.intervalGetDataId);
        this.getData();
        this.intervalGetData();
      }
    }

    componentWillUnmount() {
      clearInterval(this.intervalGetDataId);
      this.cancelGetData();
    }

    intervalGetData = () => {
      this.intervalGetDataId = setInterval(this.getData, INTERVAL_TIME);
    };

    getData = () => {
      const { fetchData, comGroupCode } = this.props;
      this.cancelGetData();
      this.source = fetchData({
        ComGroupCode: comGroupCode,
      });
    };

    cancelGetData = () => {
      if (this.source) {
        this.source.cancel();
        this.source = null;
      }
    };


    render() {
      return <Component {...this.props} />;
    }
  }

  WithRealTime.displayName = `WithRealTime(${getDisplayName(Component)})`;

  return WithRealTime;
};

export default withRealTime;
