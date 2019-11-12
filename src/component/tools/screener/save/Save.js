import React from 'react';
import { connect } from 'react-redux';
import { togglePopupSave, REDUCER_NAME } from '../reducer';
import Button from '../Button';

class Save extends React.Component {
  handleClick = () => {
    const { togglePopupSave, isShow } = this.props;

    togglePopupSave(!isShow);
  };

  render() {
    return (
      <Button
        buttonName={'stockScreener.button.SAVE'}
        onClick={this.handleClick}
      />
    );
  }
}

const mapStateToProps = state => ({
  isShow: state[REDUCER_NAME].save.isShow,
});

const mapDispatchToProps = {
  togglePopupSave,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Save);
