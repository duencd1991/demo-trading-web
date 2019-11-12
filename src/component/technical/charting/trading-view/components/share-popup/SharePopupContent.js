import React, { PureComponent } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { Translate } from 'react-redux-i18n';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import userSettingService from '../../../../../../core/services/Common/UserSettingService';
import { withWidget } from '../../../context';
import { REDUCER_NAME } from '../../../reducer';
import { capitalizeFirstLetter } from '../../helper';

class SharePopupContent extends PureComponent {
  state = {
    isCopied: false,
    isShared: false,
    url: '',
  };

  input = React.createRef();

  componentDidMount() {
    this.shareTemplateRequest();
  }

  shareTemplateRequest = () => {
    const { widget, theme } = this.props;
    widget.save(chartState => {
      chartState.theme = capitalizeFirstLetter(theme);
      userSettingService
        .getChartLayoutShareInfo({
          chartLayout: JSON.stringify(chartState),
        })
        .then(res => {
          const searchParams = new URLSearchParams(res.result);
          const url = `${
            window.location.origin
          }/charting?${searchParams.toString()}`;
          this.setState({
            url,
          });
        });
    });
  };

  handleClickOutside() {
    const { changeSharePopupStatus } = this.props;
    changeSharePopupStatus(false);
  }

  onCopyClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.input.current.select();
    document.execCommand('copy');
    this.input.current.blur();
    this.setState({
      isCopied: true,
    });
  };

  onContentClick = () => {
    this.setState({
      isCopied: false,
    });
  };

  render() {
    const { isCopied, url } = this.state;

    return (
      <div onClick={this.onContentClick} className="content">
        <div className="title">
          <Translate
            value={
              isCopied
                ? 'charting.copyToClipboard'
                : 'charting.shareChartLayout'
            }
          />
        </div>

        <div className="share-wrapper">
          <div className="share-link">
            <input
              ref={this.input}
              value={url}
              type="text"
              className="form-control"
              readOnly
            />
            <button onClick={this.onCopyClick} className="btn btn-primary">
              <Translate value="charting.copy" />
            </button>
          </div>

          <div className="share-button">
            <i className="icon-facebook" />
            <i className="icon-zalo" />
            <i className="icon-skype" />
            <i className="icon-share-chart" />
          </div>
        </div>
      </div>
    );
  }
}

SharePopupContent.propTypes = {
  changeSharePopupStatus: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  theme: state.theme,
});

export default compose(
  withWidget,
  connect(mapStateToProps),
  enhanceWithClickOutside,
)(SharePopupContent);
