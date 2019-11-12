import React from 'react';
import './index.scss';
import RowBox from './Row';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { formatVolume, formatTextFloat } from '../../../../helpers/Text';
import imgSrc from './default.svg';

const getBidVolume = item => {
  return typeof item.BID_VOLUME === 'number' ? item.BID_VOLUME : 0;
};

const getAskVolume = item => {
  return typeof item.ASK_VOLUME === 'number' ? item.ASK_VOLUME : 0;
};

class boxContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      currentTab,
      isPremiumAccount,
      list10Data,
      symbolInformation: { ReferencePrice },
      isDerivatives,
    } = this.props;

    const maxBidValueTop3 = list10Data
      ? Math.max.apply(
          Math,
          list10Data.slice(0, 3).map(function(o) {
            return getBidVolume(o);
          }),
        )
      : null;

    const maxAskValueTop3 = list10Data
      ? Math.max.apply(
          Math,
          list10Data.slice(0, 3).map(function(o) {
            return getAskVolume(o);
          }),
        )
      : null;

    const maxBidValueTop10 = list10Data
      ? Math.max.apply(
          Math,
          list10Data.map(function(o) {
            return getBidVolume(o);
          }),
        )
      : null;
    const maxAskValueTop10 = list10Data
      ? Math.max.apply(
          Math,
          list10Data.map(function(o) {
            return getAskVolume(o);
          }),
        )
      : null;

    const totalBuyVolLevel1 = list10Data
      ? list10Data.slice(0, 3).reduce(function(a, b) {
          return a + getBidVolume(b);
        }, 0)
      : 0;
    const totalSellVolLevel1 = list10Data
      ? list10Data.slice(0, 3).reduce(function(a, b) {
          return a + getAskVolume(b);
        }, 0)
      : 0;

    const totalBuyVolLevel2 = list10Data
      ? list10Data.reduce(function(a, b) {
          return a + getBidVolume(b);
        }, 0)
      : 0;
    const totalSellVolLevel2 = list10Data
      ? list10Data.reduce(function(a, b) {
          return a + getAskVolume(b);
        }, 0)
      : 0;

    const list3Rows = (
      <div>
        {list10Data &&
          list10Data
            .slice(0, 3)
            .map((item, index) => (
              <RowBox
                isDerivatives={isDerivatives}
                key={index}
                maxBidValue={maxBidValueTop3}
                maxAskValue={maxAskValueTop3}
                REFERENCE_PRICE={ReferencePrice}
                item={item}
              />
            ))}
      </div>
    );

    const list10Rows = (
      <div>
        {list10Data &&
          list10Data.map((item, index) => (
            <RowBox
              isDerivatives={isDerivatives}
              key={index}
              maxBidValue={maxBidValueTop10}
              maxAskValue={maxAskValueTop10}
              REFERENCE_PRICE={ReferencePrice}
              item={item}
            />
          ))}
      </div>
    );

    const LvlOneData = list3Rows;
    const LvlTwoData = list10Rows;

    const BUY_VOL = currentTab === 1 ? totalBuyVolLevel1 : totalBuyVolLevel2;
    const MATCHED_VOL =
      currentTab === 1
        ? totalBuyVolLevel1 + totalSellVolLevel1
        : totalBuyVolLevel2 + totalSellVolLevel2;
    const SELL_VOL = currentTab === 1 ? totalSellVolLevel1 : totalSellVolLevel2;

    return (
      <div className="box-content-wrapper">
        <div className="box-header">
          <div className="box-header--left">
            <div>{I18n.t('priceDepth.tableTitle.buyVol')}</div>
            <div>{I18n.t('priceDepth.tableTitle.bid')}</div>
          </div>
          <div className="box-header--right">
            <div>{I18n.t('priceDepth.tableTitle.ask')}</div>
            <div>{I18n.t('priceDepth.tableTitle.sellVol')}</div>
          </div>
        </div>
        <div className="box-body">
          {currentTab === 1 ? LvlOneData : LvlTwoData}
          {currentTab === 2 && !isPremiumAccount && (
            <div className="overlay">
              <div className="title d-flex align-items-center justify-content-center">
                <i className="icon-info fs-10 mr-2" />
                <div className="ml-2">
                  {I18n.t('priceDepth.action.upgradeTitle')}
                </div>
              </div>
              <div
                className="upgrade-btn"
                onClick={() => this.props.upgradeAccount()}
              >
                {I18n.t('priceDepth.action.upgrade')}
              </div>
            </div>
          )}
        </div>
        <div className="box-footer">
          <div className="item">
            <div className="main-text">
              {I18n.t('priceDepth.tableTitle.unmatchedBuyVol')}
            </div>
            <div className="sub-text d-flex align-self-start">
              {formatTextFloat(isDerivatives ? BUY_VOL : formatVolume(BUY_VOL))}
            </div>
          </div>
          <div className="item">
            <div className="main-text">
              {I18n.t('priceDepth.tableTitle.totalMatchedVol')}
            </div>
            <div className="sub-text d-flex align-self-center">
              {isDerivatives
                ? MATCHED_VOL
                : formatTextFloat(formatVolume(MATCHED_VOL))}
            </div>
          </div>
          <div className="item">
            <div className="main-text">
              {I18n.t('priceDepth.tableTitle.unmatchedSellVol')}
            </div>
            <div className="sub-text d-flex align-self-end">
              {isDerivatives
                ? SELL_VOL
                : formatTextFloat(formatVolume(SELL_VOL))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(boxContent);
