import React from 'react';
import { ConfirmPopup } from './../../../common/popup';
import { connect } from 'react-redux';
import { REDUCER_NAME, confirmDeleteTicker } from './../reducer';

class ConfirmDeletePopup extends React.Component {

  handleConfirm = (code) => (isApply) => {
    const { confirm } = this.props;

    return confirm(isApply, code);
  };

  render() {
    const { isShow, code } = this.props;

    return (
      <ConfirmPopup
        isShow={isShow}
        messages={['Are you sure you want to remove this ticker?']}
        title={'Remove Ticker'}
        confirm={this.handleConfirm(code)}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isShow: state[REDUCER_NAME].showConfirmPopupDelete,
    code: state[REDUCER_NAME].organCodeDelete,
  };
};

const mapDispatchToProps = {
  confirm: confirmDeleteTicker,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeletePopup);
