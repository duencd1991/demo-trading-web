import React from 'react';
import { SingleInputPopup } from './../../../common/popup';
import { connect } from 'react-redux';
import { REDUCER_NAME, togglePopupSave } from './../reducer';

function Popup(props) {
  const { isShow, confirm } = props;
  return (
    <div className="custom-modal">
      <SingleInputPopup isShow={isShow} confirm={confirm} />
    </div>
  );
}
const mapStateToProps = state => {
  return {
    isShow: state[REDUCER_NAME].save.isShow,
  };
};

const mapDispatchToProps = {
  confirm: togglePopupSave,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Popup);
