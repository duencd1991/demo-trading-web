import React from 'react';
import { Translate } from 'react-redux-i18n';
import './index.scss';
import imgSrc from './hourglass.png';
import Clock from './Clock';

const CountDown = props => {
  return (
    <div className={`count-down-wrapper ${props.className}`}>
      <img alt="glass" src={imgSrc} />
      <span className="title">
        <Translate value="common.marketPreOpenTitle" />
      </span>
      <Clock {...props} />
    </div>
  );
};

CountDown.defaultProps = {
  className: 'position-absolute',
};

export default CountDown;
