import React from 'react';
import { SingleInputPopup } from './../../../common/popup';
import { connect } from 'react-redux';
import { REDUCER_NAME, actionSaveLayoutPopup } from './../reducer';

class SaveLayoutPopup extends React.Component {
  render() {
    const { isShow, confirm } = this.props;

    return (
      <div className="save-workspace">
        <SingleInputPopup
          isShow={isShow}
          title={'Create workspace'}
          placeHolder={'Create workspace'}
          confirm={confirm}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isShow: state[REDUCER_NAME].saveLayout.isShowPopup,
  };
};

const mapDispatchToProps = {
  confirm: actionSaveLayoutPopup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaveLayoutPopup);
