import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import {
  formatPrice,
  formatTextFloat,
  formatVolume,
  formatPercent,
  formatValueBillion,
} from '../../../../helpers/Text';

class InforBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { relatedInformations, isDerivatives } = this.props;
    const width = `${(relatedInformations.RANKING / 5) * 100}%`;
    const opacityStyle = isDerivatives ? { opacity: 0 } : {};
    return (
      <div className="infor-board-wrapper" style={opacityStyle}>
        <div className="top-content">
          <div className="column-wrapper">
            <div className="item">
              <div className="main-text">
                {I18n.t('priceDepth.relatedInformations.bid')}
              </div>
              <div className="sub-text">
                {formatTextFloat(formatPrice(relatedInformations.BID))}
              </div>
            </div>
            <div className="item">
              <div className="main-text">
                {I18n.t('priceDepth.relatedInformations.frBuyVol')}
              </div>
              <div className="sub-text">
                {formatTextFloat(formatVolume(relatedInformations.Fr_Buy_Vol))}
              </div>
            </div>
            <div className="item">
              <div className="main-text">
                {I18n.t('priceDepth.relatedInformations.volume')}
              </div>
              <div className="sub-text">
                {formatTextFloat(formatVolume(relatedInformations.VOLUME))}
              </div>
            </div>
            <div className="item">
              <div className="main-text">
                {I18n.t('priceDepth.relatedInformations.avgPrice')}
              </div>
              <div className="sub-text">
                {formatTextFloat(formatPrice(relatedInformations.AVG_PRICE))}
              </div>
            </div>
          </div>
          <div className="column-wrapper">
            <div className="item">
              <div className="main-text">
                {I18n.t('priceDepth.relatedInformations.ask')}
              </div>
              <div className="sub-text">
                {formatTextFloat(formatPrice(relatedInformations.ASK))}
              </div>
            </div>
            <div className="item">
              <div className="main-text">
                {I18n.t('priceDepth.relatedInformations.frSellVol')}
              </div>
              <div className="sub-text">
                {formatTextFloat(formatVolume(relatedInformations.Fr_Sell_Vol))}
              </div>
            </div>
            <div className="item">
              <div className="main-text">
                {I18n.t('priceDepth.relatedInformations.avgVol10d')}
              </div>
              <div className="sub-text">
                {formatTextFloat(formatVolume(relatedInformations.AVG_Vol_10D))}
              </div>
            </div>
            <div className="item">
              <div className="main-text">
                {I18n.t('priceDepth.relatedInformations.avgVol1m')}
              </div>
              <div className="sub-text">
                {formatTextFloat(formatVolume(relatedInformations.AVG_Vol_1M))}
              </div>
            </div>
          </div>
        </div>
        <div className="divide-line" />
        <div className="bottom-content">
          <div className="column-wrapper">
            <div className="item">
              <div className="main-text">
                {I18n.t('priceDepth.relatedInformations.eps')}
              </div>
              <div className="sub-text">
                {formatTextFloat(relatedInformations.EPS)}
              </div>
            </div>
            <div className="item">
              <div className="main-text">
                {I18n.t('priceDepth.relatedInformations.pe')}
              </div>
              <div className="sub-text">
                {formatTextFloat(relatedInformations.PE)}
              </div>
            </div>
            <div className="item">
              <div className="main-text">
                {I18n.t('priceDepth.relatedInformations.pb')}
              </div>
              <div className="sub-text">
                {formatTextFloat(relatedInformations.PB)}
              </div>
            </div>
            <div className="item">
              <div className="main-text">
                {I18n.t('priceDepth.relatedInformations.marketCap')}
              </div>
              <div className="sub-text">
                {formatTextFloat(
                  formatValueBillion(relatedInformations.MARKET_CAP),
                )}
              </div>
            </div>
          </div>

          <div className="column-wrapper">
            <div className="item">
              <div className="main-text">
                {I18n.t('priceDepth.relatedInformations.beta')}
              </div>
              <div className="sub-text">
                {formatTextFloat(relatedInformations.BETA)}
              </div>
            </div>
            <div className="item">
              <div className="main-text">
                {I18n.t('priceDepth.relatedInformations.roe')}
              </div>
              <div className="sub-text">
                {formatTextFloat(formatPercent(relatedInformations.ROE))} %
              </div>
            </div>
            <div className="item">
              <div className="main-text">
                {I18n.t('priceDepth.relatedInformations.foreignOwner')}
              </div>
              <div className="sub-text">
                {formatTextFloat(
                  formatPercent(relatedInformations.FOREIGN_OWNER),
                )}
              </div>
            </div>
            <div className="item">
              <div className="main-text">
                {I18n.t('priceDepth.relatedInformations.ranking')}
              </div>
              <div className="sub-text">
                <div className="star-vote" style={{ margin: 0 }}>
                  <span className="star-real" style={{ width }}>
                    <i className="icon-star-fill" />
                  </span>
                  <span className="star-out">
                    <i className="icon-star-strock" />
                  </span>
                </div>
              </div>
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

export default connect(mapStateToProps)(InforBoard);
