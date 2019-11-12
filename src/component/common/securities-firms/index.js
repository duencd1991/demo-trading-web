import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';

class SecuritiesFirms extends Component {
  render() {
    const { isShowModal } = this.props;
    return (
      isShowModal && (
        <div className="securities-firms-wrapper">
          <Modal />
        </div>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    isShowModal: state.isShowModal,
  };
};

export default connect(mapStateToProps)(SecuritiesFirms);
