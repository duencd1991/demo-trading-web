import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUnique } from './../../helpers/Common';
import { toggleModal } from '../../app/reducer';
import enhanceWithClickOutside from 'react-click-outside';
import {
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
} from './logo-img';
import { Translate } from 'react-redux-i18n';

const listLogos = [
  [
    {
      link: 'https://tradingonline.bsc.com.vn/',
      logoLink: logo1,
    },
    {
      link: 'https://i-trade.hsc.com.vn/i-trade/',
      logoLink: logo2,
    },
  ],
  [
    {
      link: 'https://www.kisvn.vn/kisportal/',
      logoLink: logo3,
    },
    {
      link: 'https://stock24.mbs.com.vn/',
      logoLink: logo4,
    },
  ],
  [
    {
      link: 'https://online.shs.com.vn/',
      logoLink: logo5,
    },
    {
      link: 'https://webtrading.ssi.com.vn/',
      logoLink: logo6,
    },
  ],
  [
    {
      link: 'https://www.vcbs.com.vn',
      logoLink: logo7,
    },
    {
      link: 'https://onlinetrading.vcsc.com.vn/',
      logoLink: logo8,
    },
  ],
  [
    {
      link: 'https://www.vndirect.com.vn/signin/',
      logoLink: logo9,
    },
    {
      link: 'https://yswinner.yuanta.com.vn/Logon',
      logoLink: logo10,
    },
  ],
];

class Modal extends Component {
  handleOnclick = () => {
    const { toggleModal } = this.props;
    toggleModal(false);
  };

  handleClickOutside = () => {
    const { toggleModal } = this.props;
    toggleModal(false);
  };

  render() {
    return (
      <div className="securities-firms">
        <div className="title">
          <div>
            <a href="javascript:void(0)">
              <i className="icon-coins text-stock-chart fs-20" />
            </a>
          </div>
          <div className="text">
            <Translate value={'common.TITLE_POPUP_BUY_SELL'} />
          </div>
          <div className="close-button">
            <a onClick={this.handleOnclick} href="javascript:void(0)">
              <i className="icon-close text-stock-chart" />
            </a>
          </div>
        </div>
        <div className="container">
          {listLogos.map((container, index) => (
            <div
              className="logo-row d-flex w-100 justify-content-between"
              key={getUnique() + index}
            >
              <a
                className="logo"
                href={container[0].link}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src={container[0].logoLink} alt="logo" />
              </a>
              <a
                className="logo"
                href={container[1].link}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src={container[1].logoLink} alt="logo" />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  toggleModal,
};

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  enhanceWithClickOutside,
)(Modal);
