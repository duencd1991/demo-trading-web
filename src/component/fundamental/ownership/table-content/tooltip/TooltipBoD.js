import React, { Component } from 'react';
import './OwnerShipStyle.scss';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { REDUCER_NAME, fetchInfoBoDTooltip } from '../../reducer';
import { formatDate } from '../../../../helpers/DateTime';
import {
  formatTextFloat,
  formatPrice,
  formatPercent,
} from '../../../../helpers/Text';

const TYPE_BUY = 'B';
const TYPE_SELL = 'S';

class TooltipBoD extends Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.state = {
      isHovering: false,
      isCallApi: true,
      styleTooltip: {},
    };
  }

  caculateStylePositionTooltip(cursorPosition, bottom, caculateHeight) {
    let styleTooltip = {};
    console.log(
      'cursorPosition + caculateHeight : ',
      cursorPosition + caculateHeight,
    );
    console.log('bottom : ', bottom);
    if (cursorPosition + caculateHeight > bottom) {
      styleTooltip = {
        display: 'block',
        left: 100,
        top: 0 - caculateHeight - 15,
      };
    } else {
      styleTooltip = { display: 'block', left: 100 };
    }
    return styleTooltip;
  }

  handleMouseHover(e, heightTooltip) {
    const { bottom } = this.props;
    let cursorPosition = e.clientY;
    let caculateHeight = heightTooltip.height ? heightTooltip.height : 50;
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

  handleMouseOut(e) {
    this.setState({ isHovering: false, isCallApi: true });
  }

  callApiTooltip(e) {
    const { dispatch, code, personId, id: componentId } = this.props;
    if (this.state.isCallApi) {
      dispatch(fetchInfoBoDTooltip(code, personId, componentId));
    }
  }

  getTooltipBodyContent(bodTooltipInfo, heightTooltip) {
    let tooltipBodyContent = '';
    if (bodTooltipInfo.length > 0) {
      tooltipBodyContent = (
        <div className="div-wrapper-tooltip-body" style={heightTooltip}>
          {bodTooltipInfo.map(item => (
            <div className="tooltip-body-ownship" key={item.index}>
              <div
                className="children-div-body-align-left"
                style={{ width: '15%' }}
              >
                {formatDate(item.publicDate)}
              </div>
              <div
                className="children-div-body-align-left"
                style={{ width: '10%' }}
              >
                {item.actionTypeCode === TYPE_BUY ? 'Buy' : 'Sell'}
              </div>
              <div
                className="children-div-body-align-right"
                style={{ width: '15%' }}
              >
                <span
                  style={{
                    color:
                      item.actionTypeCode === TYPE_SELL &&
                      item.shareRegisger > 0
                        ? '#eb505a'
                        : 'white',
                  }}
                >
                  {formatTextFloat(formatPrice(item.shareRegisger))}
                </span>
              </div>
              <div
                className="children-div-body-align-right"
                style={{ width: '15%' }}
              >
                <span
                  style={{
                    color:
                      item.actionTypeCode === TYPE_SELL ? '#eb505a' : 'white',
                  }}
                >
                  {formatTextFloat(formatPrice(item.shareAcquire))}
                </span>
              </div>
              <div
                className="children-div-body-align-right"
                style={{ width: '15%' }}
              >
                {formatTextFloat(formatPrice(item.shareBeforeTrade))}
              </div>
              <div
                className="children-div-body-align-right"
                style={{ width: '15%' }}
              >
                {formatTextFloat(formatPrice(item.shareAfterTrade))}
              </div>
              <div
                className="children-div-body-align-right"
                style={{ width: '15%' }}
              >
                {`${formatPercent(item.ownershipAfterTrade)} %`}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      tooltipBodyContent = (
        <div style={{ height: 20 }}>
          <div className="tooltip-body-ownship-no-data">
            <span>No Data</span>
          </div>
        </div>
      );
    }
    return tooltipBodyContent;
  }

  render() {
    const titleTooltip = I18n.t(
      'ownerShip.titleTooltip.fiveLastestTransaction',
    );
    const listTitle = I18n.t('ownerShip.listTitleTooltipBoD');
    const { fullName, bodTooltipInfo } = this.props;
    const { styleTooltip } = this.state;
    let heightTooltip = {};
    if (bodTooltipInfo.length >= 5) {
      heightTooltip = { height: 100 };
    }
    let tooltipBodyContent = this.getTooltipBodyContent(
      bodTooltipInfo,
      heightTooltip,
    );

    return (
      <div
        className="tooltip-ownship"
        onMouseOver={e => this.callApiTooltip(e)}
        onMouseLeave={e => this.handleMouseOut(e)}
      >
        {this.state.isHovering && (
          <div className={`tooltip-bubble-ownship`} style={styleTooltip}>
            <div className="tooltip-title-ownship">
              {titleTooltip} - {fullName}{' '}
            </div>
            <div className="tooltip-header-bod-ownship">
              <div className="align-left" style={{ width: '15%' }}>
                {listTitle.AN_DATE}
              </div>
              <div className="align-left" style={{ width: '10%' }}>
                {listTitle.TYPE}
              </div>
              <div className="align-right" style={{ width: '15%' }}>
                {listTitle.REGISTER}
              </div>
              <div className="align-right" style={{ width: '15%' }}>
                {listTitle.RESULT}
              </div>
              <div className="align-right" style={{ width: '15%' }}>
                {listTitle.SHARE_BEFORE} <br />{' '}
                {`${I18n.t('ownerShip.multiLineTitleTable.BEFOR')}`}
              </div>
              <div className="align-right" style={{ width: '15%' }}>
                {listTitle.SHARE_AFTER} <br />{' '}
                {`${I18n.t('ownerShip.multiLineTitleTable.AFTER')}`}
              </div>
              <div className="align-right" style={{ width: '15%' }}>
                {listTitle.PERCENTAGE}
              </div>
            </div>

            {tooltipBodyContent}
          </div>
        )}
        <div onMouseMove={e => this.handleMouseHover(e, heightTooltip)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  return {
    bodTooltipInfo: state[REDUCER_NAME].listMultiComponent[id].bodTooltipInfo,
  };
};

export default connect(mapStateToProps)(TooltipBoD);
