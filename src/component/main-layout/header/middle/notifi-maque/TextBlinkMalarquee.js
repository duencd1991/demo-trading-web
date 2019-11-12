import React, { PureComponent } from 'react';
import './TextBlink.scss';
import moment from 'moment';
import {
  getColorPrice,
  getIconPriceFollowReferencePrice,
} from '../../../../helpers/Color';
import { getDataFollowKeyByDot } from '../../../../helpers/Common';
import Const from './Const';
import { formatTextFloat, formatPercent } from '../../../../helpers/Text';

const ANIMATION_TIME = 700;
const BLINK_DELAY = 1000;

class TextBlinkMalarquee extends PureComponent {
  constructor(props) {
    super(props);
    this.startDate = moment();
  }

  checkDelayBlink = () => {
    const currentDate = moment();
    const diffMillisecond = currentDate.diff(this.startDate, 'millisecond');

    if (diffMillisecond < BLINK_DELAY) {
      return true;
    }
    this.startDate = currentDate;
    return false;
  };

  addClassChild = classColor => {
    const { className } = this.props;

    if (this.checkDelayBlink()) {
      return;
    }

    if (!this.div) {
      return;
    }
    this.div.childNodes.forEach(function(item, i) {
      if (i > 0) {
        item.classList.add(classColor);
        item.classList.add('transition');

        if (className) {
          item.classList.remove(className);
        }
        item.classList.add('text-white-all');

        item.blinkTimeout = setTimeout(() => {
          item.classList.remove(classColor);
          item.classList.remove('transition');

          if (item) {
            item.classList.remove('text-white-all');
            if (className) {
              item.classList.add(className);
            }
          }
        }, ANIMATION_TIME);
      }
    });
  };

  getCellText = content => {
    if (typeof content === 'string') {
      return content;
    }
    return content;
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps &&
      prevProps.data.tradingDate !== this.props &&
      prevProps.data.tradingDate
    ) {
      if (this.props.data.indexValue > prevProps.data.indexValue) {
        this.addClassChild('bg-l-color-9');
      } else if (this.props.data.indexValue < prevProps.data.indexValue) {
        this.addClassChild('bg-s-color-3');
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.blinkTimeout);
  }

  removeBlinkClass = className => {
    if (this.div && this.div.parentNode) {
      this.div.parentNode.classList.remove(className);
    }
  };

  render() {
    const { data } = this.props;
    const indexValue = getDataFollowKeyByDot(
      data,
      Const.listColumnTable.INDEX_VALUE,
    );
    const indexValueRef = getDataFollowKeyByDot(
      data,
      Const.listColumnTable.REFERENCE_INDEX,
    );
    const colorIndex = getColorPrice(indexValue, indexValueRef);
    const classNameIndexValue = `number fs-16 mr-5 ` + colorIndex;
    const classIconCaret =
      colorIndex +
      ` fs-10  ` +
      getIconPriceFollowReferencePrice(indexValue, indexValueRef);
    return (
      <div ref={el => (this.div = el)} className="item-content">
        <strong className="id-trade fs-16 mr-5 text-uppercase ">
          {data.comGroupCode}{' '}
        </strong>
        <span className={classNameIndexValue}>
          {formatTextFloat(data.indexValue)} <i className={classIconCaret} />
          <span className={classNameIndexValue}>
            {formatTextFloat(data.indexChange)}{' '}
          </span>
          <span className="number-per fs-16 text-percent-index-change">
            {formatPercent(data.percentIndexChange)}%
          </span>
        </span>
      </div>
    );
  }
}

TextBlinkMalarquee.defaultProps = {
  className: 'text-blink',
};

export default TextBlinkMalarquee;
