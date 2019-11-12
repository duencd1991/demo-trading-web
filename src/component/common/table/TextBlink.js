import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './text-blink.scss';
import Const from './Const';
import moment from 'moment';
import { convertStringToFloat } from './../../helpers/Text';
import { getDataFollowKeyByDot } from './../../helpers/Common';

const ANIMATION_TIME = 700;

class TextBlink extends PureComponent {

  constructor(props) {
    super(props);
    this.startDate = moment();
  }

  checkDelayBlink = () => {
    const currentDate = moment();
    const diffMillisecond = currentDate.diff(this.startDate, 'millisecond');

    if (diffMillisecond < Const.BLINK_DELAY) {
      return true;
    }
    this.startDate = currentDate;
    return false;
  };

  addClassParent = (classColor) => {
    const { className } = this.props;

    if (this.checkDelayBlink()) {
      return;
    }

    if (!this.div) {
      return;
    }
    this.div.parentNode.classList.add(classColor);
    this.div.parentNode.classList.add('transition');

    if (className) {
      this.div.classList.remove(className);
    }
    this.div.classList.add('text-white');

    this.blinkTimeout = setTimeout(() => {
      this.removeBlinkClass(classColor);
      this.removeBlinkClass('transition');

      if (this.div) {
        this.div.classList.remove('text-white');
        if (className) {
          this.div.classList.add(className);
        }
      }
    }, ANIMATION_TIME);
  };

  getCellText = (content) => {
    if (typeof content === 'string') {
      return content;
    }

    return content;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { children, item, tradingDate, keyObject: key } = this.props;
    if (item && getDataFollowKeyByDot(item, tradingDate) !== getDataFollowKeyByDot(prevProps.item, tradingDate)) {
      const currentData = key ? convertStringToFloat(getDataFollowKeyByDot(item, key)) : convertStringToFloat(this.getCellText(children));
      const prevData = key ? convertStringToFloat(getDataFollowKeyByDot(prevProps.item, key)) : convertStringToFloat(this.getCellText(prevProps.children));

      if (currentData > prevData) {
        this.addClassParent('bg-l-color-9');
      }
      if (currentData < prevData) {
        this.addClassParent('bg-s-color-3');
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.blinkTimeout);
  }

  removeBlinkClass = (className) => {
    if (this.div && this.div.parentNode) {
      this.div.parentNode.classList.remove(className);
    }
  };

  render() {
    const { children, className } = this.props;
    return (
      <div>
        <div ref={el => this.div = el}
             style={{ paddingLeft: '9px', paddingRight: '8px' }}
             className={className}>
          {children || ''}
        </div>
      </div>
    );
  }
}

TextBlink.propTypes = {
  children: PropTypes.node.isRequired,
};

TextBlink.defaultProps = {
  className: 'text-blink',
};

export default TextBlink;
