import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { toggleModal } from '../../../../app/reducer';
class groupButton extends React.Component {
  handleOnclick = () => {
    const { toggleModal } = this.props;
    toggleModal(true);
  };

  render() {
    return (
      <div className="group-button d-flex align-items-center justify-content-between my-other-other-step">
        <div className="group-button--buy mb-10" onClick={this.handleOnclick}>
          BUY
        </div>
        <div className="group-button--sell" onClick={this.handleOnclick}>
          SELL
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: status => dispatch(toggleModal(status)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(groupButton);
