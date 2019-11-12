import React, { PureComponent } from 'react';
import './clock.scss';

class Clock extends PureComponent {
  minRef = React.createRef();
  secondRef = React.createRef();

  componentDidMount() {
    this.setTime(false);
  }

  componentDidUpdate(prevProps) {
    const { totalSeconds } = this.props;
    if (totalSeconds !== prevProps.totalSeconds) {
      this.setTime();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.animationTimeout);
  }

  setTime = (flip = true) => {
    const { totalSeconds } = this.props;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds - minutes * 60;
    this.updateGroup('min', minutes, flip);
    this.updateGroup('sec', seconds, flip);
  };

  flipTo = (digit, n) => {
    const current = digit.getAttribute('data-num');
    digit.setAttribute('data-num', n);
    digit.querySelector('.front').setAttribute('data-content', current);
    [...Array.from(digit.querySelectorAll('.back, .under'))].forEach(item => {
      item.setAttribute('data-content', n);
    });

    [...Array.from(digit.querySelectorAll('.flap'))].forEach(item => {
      item.style.display = 'block';
    });
    this.animationTimeout = setTimeout(() => {
      digit.querySelector('.base').textContent = n;
      [...Array.from(digit.querySelectorAll('.flap'))].forEach(item => {
        item.style.display = 'none';
      });
    }, 400);
  };

  jumpTo = (digit, n) => {
    digit.setAttribute('data-num', n);
    digit.querySelector('.base').textContent = n;
  };

  getDigit = group => {
    if (group === 'min') {
      return this.minRef.current;
    }

    return this.secondRef.current;
  };

  updateGroup = (group, n, flip) => {
    const digit = this.getDigit(group);
    let number = n.toString();
    if (number.length === 1) number = '0' + n;
    if (number !== digit.getAttribute('data-num')) {
      if (flip) this.flipTo(digit, number);
      else this.jumpTo(digit, number);
    }
  };

  render() {
    return (
      <div className="clock d-flex">
        <div className="min-wrapper">
          <div className="text">Minutes</div>
          <div ref={this.minRef} className="digit min">
            <span className="base" />
            <div className="flap over front">
              <div className="stick" />
            </div>
            <div className="flap over back" />
            <div className="flap under" />
            <div className="line" />
          </div>
        </div>

        <div className="seconds-wrapper">
          <div className="text">Seconds</div>
          <div ref={this.secondRef} className="digit sec">
            <span className="base" />
            <div className="flap over front">
              <div className="stick" />
            </div>
            <div className="flap over back" />
            <div className="flap under" />
            <div className="line" />
          </div>
        </div>
      </div>
    );
  }
}

Clock.propTypes = {};

export default Clock;
