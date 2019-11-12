import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { toggleModal } from '../../../app/reducer';

class BuySellButton extends React.Component {
  render() {
    const { toggleModal } = this.props;
    return (
      <div className="group-button d-flex align-items-center justify-content-between flex-row mr-3">
        <div
          className="group-button--buy"
          onClick={() => toggleModal(true)}
          style={{ marginRight: 4 }}
        >
          BUY
        </div>
        <div className="group-button--sell" onClick={() => toggleModal(true)}>
          SELL
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
  };
};

const mapDispatchToProps = {
  toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuySellButton);
