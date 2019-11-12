import React from 'react';
import textLinkIcon9 from './../../../assets/images/svg/i-9.svg';
import textLinkIcon10 from './../../../assets/images/svg/i-10.svg';
import textLinkIcon11 from './../../../assets/images/svg/i-11.svg';
import textLinkIcon12 from './../../../assets/images/svg/i-12.svg';
import textLinkIcon13 from './../../../assets/images/svg/i-13.svg';
import textLinkIcon14 from './../../../assets/images/svg/i-14.svg';
import textLinkIcon15 from './../../../assets/images/lap-1.png';
import ScrollComponent from '../../common/ScrollComponent';
import { compose } from 'redux';
import ConstCommon from './../../common/Const';
import withPreRender from './../../common/withPreRender';

class TradeData extends React.Component {
  render() {
    return (
      <ScrollComponent>
        <div className="tradedata-wrapper pl-20 pr-20 h-100 d-flex flex-column">
          <div className="trade-des-ti">
            <h1>TRADE DATA</h1>
            <p>Ultimate Data Source for Amibrokers</p>
          </div>
          <div className="image-and-button">
            <div>
              <img style={{ width: '250px' }} src={textLinkIcon15} />
            </div>
            <div className="list-btn-ads">
              <div>
                <a href="#" className="btn-tradedata btn1">
                  Try for Free
                </a>
                <a href="#" className="btn-tradedata btn2">
                  User Manual
                </a>
              </div>
            </div>
          </div>
          <div className="list-icon-tradedate">
            <div className="item-list-td">
              <img src={textLinkIcon9} />
              <p>FULL EOD HISTORICAL DATA</p>
            </div>
            <div className="item-list-td">
              <img src={textLinkIcon10} />
              <p>REAL-TIME DATA UPDATED</p>
            </div>
            <div className="item-list-td">
              <img src={textLinkIcon11} />
              <p>INTRADAY DATA EVERY MINUTE</p>
            </div>
          </div>
          <div className="list-icon-tradedate">
            <div className="item-list-td">
              <img src={textLinkIcon12} />
              <p>PLUGIN CONNECT</p>
            </div>
            <div className="item-list-td">
              <img src={textLinkIcon13} />
              <p>COMPREHENSIVE DATA</p>
            </div>
            <div className="item-list-td">
              <img src={textLinkIcon14} />
              <p>EASY TO USE</p>
            </div>
          </div>
        </div>
      </ScrollComponent>
    );
  }
}

export default compose(withPreRender(ConstCommon.listComponent.TradeData))(
  TradeData,
);
