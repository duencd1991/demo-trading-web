import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { REDUCER_NAME as COMMON_REDUCER_NAME } from '../../../app/commonReducer';

class Time extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      time: this.getTime(),
    };
  }

  componentDidMount() {
    const { timeOffset } = this.props;
    if (timeOffset !== null) {
      this.setInterVal();
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { timeOffset } = this.props;
    if (timeOffset !== nextProps.timeOffset) {
      this.setState({
        time: this.getTime(nextProps),
      });
      this.setInterVal();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fillNumber = number => {
    return number < 10 ? `0${number}` : number;
  };

  setInterVal = () => {
    this.interval = setInterval(() => {
      this.setState({
        time: this.getTime(),
      });
    }, 1000);
  };

  getTime = props => {
    const { timeOffset } = props || this.props;
    if (timeOffset === null) {
      return null;
    }
    const now = new Date();
    now.setSeconds(now.getSeconds() + timeOffset);

    return `${this.fillNumber(now.getHours())}
    :${this.fillNumber(now.getMinutes())}
    :${this.fillNumber(now.getSeconds())}`;
  };

  render() {
    const { time } = this.state;
    const { timeOffset } = this.props;
    if (timeOffset === null) {
      return null;
    }

    return <div className="time">{time}</div>;
  }
}

Time.propTypes = {
  timeOffset: PropTypes.number,
};

Time.defaultProps = {
  timeOffset: null,
};

const mapStateToProps = state => ({
  timeOffset: state[COMMON_REDUCER_NAME].timeOffset,
});

export default connect(mapStateToProps)(Time);
