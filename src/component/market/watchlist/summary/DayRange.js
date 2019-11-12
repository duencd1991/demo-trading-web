import { formatTextFloat } from '../../../helpers/Text';
import React from 'react';
import './day-range.scss';

export default class DayRange extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHover: false
    };
  }

  toggleHover = (isHover) => {
    this.setState({ ...this.state, isHover });
  };

  calculateDayRangeChart = (lowestPrice, highestPrice, matchPrice, referencePrice) => {
    let $lowestPrice;
    let $highestPrice;
    let $widthLowestPrice;
    let $widthHighestPrice;
    let $positionLastPrice;
    // check lastPrice with lowestPrice and highestPrice
    if (lowestPrice >= matchPrice || highestPrice <= matchPrice) {
      if (lowestPrice >= matchPrice) {
        $lowestPrice = matchPrice;
      } else {
        $lowestPrice = lowestPrice;
      }
      if (highestPrice <= matchPrice) {
        $highestPrice = matchPrice;
      } else {
        $highestPrice = highestPrice;
      }
    } else {
      $lowestPrice = lowestPrice;
      $highestPrice = highestPrice;
    }

    // check referencePrice with $lowestPrice(new) and $highestPrice(new)
    if (referencePrice <= $lowestPrice) {
      $lowestPrice = referencePrice;
      const percentPrice = ($highestPrice - $lowestPrice) / 100;
      $widthLowestPrice = 0;
      $widthHighestPrice = 99 - 1;
      $positionLastPrice = this.checkPositionLastPrice($lowestPrice, percentPrice, matchPrice);
    } else if (referencePrice >= $highestPrice) {
      $highestPrice = referencePrice;
      const percentPrice = ($highestPrice - $lowestPrice) / 100;
      $widthLowestPrice = 99;
      $widthHighestPrice = 0;
      $positionLastPrice = this.checkPositionLastPrice($lowestPrice, percentPrice, matchPrice);
    } else if ($lowestPrice <= matchPrice && matchPrice <= $highestPrice) {
      const percentPrice = ($highestPrice - $lowestPrice) / 100;
      $widthLowestPrice = this.checkWidthLowestPriceDayRange($lowestPrice, percentPrice, referencePrice);
      $widthHighestPrice = 100 - $widthLowestPrice;
      $positionLastPrice = this.checkPositionLastPrice($lowestPrice, percentPrice, matchPrice);
    }

    return [$widthLowestPrice, $widthHighestPrice, $positionLastPrice, $lowestPrice, $highestPrice];
  };

  checkWidthLowestPriceDayRange = ($lowestPrice, percentPrice, referencePrice) => {
    return (referencePrice - $lowestPrice) / percentPrice;
  };

  checkPositionLastPrice = ($lowestPrice, percentPrice, matchPrice) => {
    return (matchPrice - $lowestPrice) / percentPrice;
  };

  checkShowHideLowestPrice = ($widthLowestPrice) => {
    if($widthLowestPrice > 0){
      return (
        <>
          <span style={{ width: $widthLowestPrice + '%' }} className="value value1"/>
        </>
      )
    }
  }
  checkShowHideHighestPrice = ($widthHighestPrice) => {
    if($widthHighestPrice > 0){
      return (
        <>
          <span style={{ width: $widthHighestPrice + '%' }} className="value value2"/>
        </>
      )
    }
  }

  render() {
    const { isHover } = this.state;
    const { lowestPrice, highestPrice, matchPrice, referencePrice } = this.props;

    let [$widthLowestPrice, $widthHighestPrice, $positionLastPrice, $lowestPrice, $highestPrice] =
      this.calculateDayRangeChart(lowestPrice, highestPrice, matchPrice, referencePrice);
    if($widthLowestPrice >0){

    }
    return (

      <div
        onMouseEnter={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
      >
        <div className="day-ranger">
          <span className="text-inline">{formatTextFloat($lowestPrice)}</span>
          <span className="text-inline last">{formatTextFloat($highestPrice)}</span>
          {this.checkShowHideLowestPrice($widthLowestPrice)}
          {this.checkShowHideHighestPrice($widthHighestPrice)}
          <small className="value3" style={{ left: $positionLastPrice + '%' }}/>
        </div>

        <div
          style={{ position: 'absolute' }}>
          {
            !isHover &&
            <div className="float-right">
            </div>
          }
          {
            isHover &&
            <div
              style={{ width: '120px', bottom: -6 }}
              className='tooltip-day-range'>
              <div className="d-flex flex-column">
                <p
                  className="tooltip-message-dayrange mb-0">Last: {formatTextFloat(matchPrice)} Ref: {formatTextFloat(referencePrice)}</p>
                <p className="tooltip-message-dayrange mb-0">Day
                  Range: {formatTextFloat($lowestPrice)} - {formatTextFloat($highestPrice)}</p>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }

}

