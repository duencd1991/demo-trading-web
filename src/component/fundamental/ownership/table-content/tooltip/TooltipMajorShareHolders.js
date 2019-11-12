import React, { Component } from 'react';
import './OwnerShipStyle.scss';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { REDUCER_NAME, fetchInfoShareHolderTooltip } from '../../reducer';
import { formatDate } from '../../../../helpers/DateTime';
import {
  formatTextFloat,
  formatPrice,
  formatPercent,
} from '../../../../helpers/Text';

class TooltipShareHolder extends Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.state = {
      isHovering: false,
      isCallApi: true,
      shareHolderTooltipInfo: [],
      styleTooltip: {},
    };
    this.divRef = React.createRef();
  }

  scrollDivTooltip(e) {
    let y = Math.sign(e.deltaY);
    let delta = 0;
    if (e.wheelDelta) {
      // IE and Opera
      delta = e.wheelDelta / 60;
    } else if (e.detail) {
      // W3C
      delta = -e.detail / 2;
    }
    var currPos = document.getElementById('mainHeader').offsetTop;
    currPos = parseInt(currPos) - delta * 10;

    console.log('currPos : ', currPos);
    document.getElementById('mainHeader').style.top = currPos + 'px';
    //document.getElementById('mainHeader').innerHTML = e.wheelDelta + ":" + e.detail;

    //this.divRef.current.clientY
    //.clientY.scrollIntoView();
  }

  caculateStylePositionTooltip(cursorPosition, bottom, caculateHeight) {
    let styleTooltip = {};
    if (cursorPosition + 120 > bottom) {
      styleTooltip = {
        display: 'block',
        left: 150,
        top: 0 - caculateHeight - 30,
      };
    } else {
      styleTooltip = { display: 'block', left: 150 };
    }
    return styleTooltip;
  }

  handleMouseHover(e, heightTooltip) {
    const { shareHolderTooltipInfo, bottom } = this.props;
    let cursorPosition = e.clientY;
    if (shareHolderTooltipInfo.length > 0) {
      let caculateHeight = heightTooltip.height;
      let styleTooltip = this.caculateStylePositionTooltip(
        cursorPosition,
        bottom,
        caculateHeight,
      );
      this.setState({
        isHovering: true,
        isCallApi: false,
        styleTooltip,
      });
    }
  }

  handleMouseOut(e) {
    this.setState({ isHovering: false, isCallApi: true });
  }

  callApiTooltip(e) {
    const { dispatch, code, id } = this.props;
    if (this.state.isCallApi) {
      dispatch(fetchInfoShareHolderTooltip(code, id));
    }
  }

  caculateHeightTooltip(totalItem) {
    let heightTooltip = 0;
    switch (totalItem) {
      case 1:
        heightTooltip = 20;
        break;
      case 2:
        heightTooltip = 40;
        break;
      case 3:
        heightTooltip = 60;
        break;
      case 4:
        heightTooltip = 80;
        break;
      case 5:
        heightTooltip = 100;
        break;
      default:
        heightTooltip = 100;
        break;
    }
    return heightTooltip;
  }

  render() {
    const titleTooltip = I18n.t('ownerShip.titleTooltip.investmentPortfolio');
    const listTitle = I18n.t('ownerShip.listTitleTooltipShareHolder');
    const { shareHolderTooltipInfo, shareHolderName } = this.props;
    const { styleTooltip } = this.state;
    let heightTooltip = { height: 0 };
    let tooltipBodyNoContent = '';

    if (shareHolderTooltipInfo.length > 0) {
      heightTooltip = {
        height: this.caculateHeightTooltip(shareHolderTooltipInfo.length),
      };
    } else {
      tooltipBodyNoContent = (
        <div className="div-wrapper-tooltip-body">
          <div className="tooltip-body-ownship-no-data">
            <span>No Data</span>
          </div>
        </div>
      );
    }

    return (
      <div
        className="tooltip-ownship"
        onMouseOver={e => this.callApiTooltip(e)}
        onMouseLeave={e => this.handleMouseOut(e)}
      >
        {this.state.isHovering && (
          <div className={`tooltip-bubble-ownship`} style={styleTooltip}>
            <div className="tooltip-title-ownship text-truncate">{`${titleTooltip} - ${shareHolderName}`}</div>
            <div className="tooltip-header-ownship">
              <div className="align-left" style={{ width: '42%' }}>
                {listTitle.COMPANY}
              </div>
              <div className="align-right" style={{ width: '20%' }}>
                {listTitle.SHARES}
              </div>
              <div className="align-right" style={{ width: '20%' }}>
                {listTitle.PERCENTAGE}
              </div>
              <div className="align-left" style={{ width: '18%' }}>
                {listTitle.PUBLIC_DATE}
              </div>
            </div>

            <div
              className="div-wrapper-tooltip-body"
              style={heightTooltip}
              tabIndex={0}
              ref={this.divRef}
              id={'mainHeader'}
            >
              {shareHolderTooltipInfo
                ? shareHolderTooltipInfo.map(item => (
                    <div className="tooltip-body-ownship" key={item.organCode}>
                      <div
                        className="children-div-body-align-left"
                        style={{ width: '42%' }}
                      >
                        <span style={{ fontWeight: 'bold' }}>
                          {item.organCode}
                        </span>
                        <span> </span>
                        <span style={{ fontSize: 9, color: '#969696' }}>
                          {item.nameAndExchange}
                        </span>
                      </div>
                      <div
                        className="children-div-body-align-right"
                        style={{
                          width: '20%',
                        }}
                      >
                        {formatTextFloat(formatPrice(item.quantity))}
                      </div>
                      <div
                        className="children-div-body-align-right"
                        style={{
                          width: '20%',
                        }}
                      >
                        {`${formatPercent(formatTextFloat(item.percentage))} %`}
                      </div>
                      <div
                        className="children-div-body-align-left font-weight-light"
                        style={{ width: '18%' }}
                      >
                        {formatDate(item.publicDate)}
                      </div>
                    </div>
                  ))
                : tooltipBodyNoContent}
            </div>
          </div>
        )}
        <div
          className="company-name"
          onMouseMove={e => {
            this.handleMouseHover(e, heightTooltip);
          }}
          // onWheel={(e) => {
          //   this.scrollDivTooltip(e);
          // }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  return {
    shareHolderTooltipInfo:
      state[REDUCER_NAME].listMultiComponent[id].shareHolderTooltipInfo,
  };
};

export default connect(mapStateToProps)(TooltipShareHolder);
