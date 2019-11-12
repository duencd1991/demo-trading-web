import React from 'react';
import '../Popup.scss';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';

class Popup extends React.Component {
  render() {
    return (
      <div className="popup_inner">
        <span className="warn warning" />
        <span className="popup_inner_title">{I18n.t(this.props.title)}</span>
        <span className="popup_inner_content">
          {I18n.t(this.props.textContent)}
        </span>
        <div className="popup-button mt-5">
          <button className="btn-delete text-uppercase mr-5">
            {I18n.t('common.button.delete')}
          </button>
          <button
            className="btn-cancel text-uppercase"
            onClick={this.props.handleClickClose}
          >
            {I18n.t('common.button.cancel')}
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(Popup);
