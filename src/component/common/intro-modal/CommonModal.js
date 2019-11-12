import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toggleIntro } from '../../app/reducer';
import enhanceWithClickOutside from 'react-click-outside';
import { Translate } from 'react-redux-i18n';
import StockImg from '../../../assets/images/lap-1.png';

class CommonModal extends Component {
  render() {
    const { title = 'this is title', img, listButton } = this.props;
    return (
      <div className="intro-modal">
        <div className="title">
          <div className="text">
            <a href="javascript:void(0)">
              <i
                className="icon-coins text-stock-chart fs-20"
                style={{ marginRight: 8 }}
              />
            </a>
            <Translate value={'common.TITLE_POPUP_TUTORIAL'} />
          </div>
          <div className="close-button">
            <a onClick={this.handleOnclick} href="javascript:void(0)">
              <i className="icon-close text-stock-chart" />
            </a>
          </div>
        </div>
        <div className="modal-container">
          <div className="welcome-text">{title}</div>
          <div className="stock-img">
            <img src={StockImg} alt="tutorial-img" />
          </div>
          <div className="tutorial-group-button">
            <div className="d-flex button-container">
              <div
                className="tutorial-button start"
                onClick={this.props.handelStartIntro}
              >
                Start
              </div>
              <div
                className="tutorial-button skip"
                onClick={() => this.props.toggleIntro(false)}
              >
                Skip
              </div>
            </div>

            {/* <div className="d-flex button-container">
              <div className="tutorial-button start">
                Next
              </div>
              <div className="tutorial-button skip">
                Back
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  toggleIntro,
};

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  enhanceWithClickOutside,
)(CommonModal);
