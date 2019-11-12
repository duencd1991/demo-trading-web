import React from 'react';
import { ConfirmPopup } from './../../../common/popup';
import { connect } from 'react-redux';
import { REDUCER_NAME, toggleConfirmPopupCreateWatchList } from './../reducer';

class ConfirmCreatePopup extends React.Component {
  render() {
    const { isShow, confirm, messages } = this.props;

    return (
      <ConfirmPopup
        isShow={isShow}
        messages={messages}
        title={'watchListSummary.createWatchList'}
        confirm={confirm}
        enabledApply={false}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isShow: state[REDUCER_NAME].createWl.isShowPopup,
    messages: state[REDUCER_NAME].createWl.messages,
  };
};

const mapDispatchToProps = {
  confirm: toggleConfirmPopupCreateWatchList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmCreatePopup);
