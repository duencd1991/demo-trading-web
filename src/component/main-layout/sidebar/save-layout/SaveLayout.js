import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_NAME, toggleSaveLayoutPopup } from './../reducer';
import { compose } from 'redux';

class SaveLayout extends React.Component {
  save = () => {
    const { toggleSaveLayoutPopup } = this.props;
    toggleSaveLayoutPopup();
  };

  render() {
    return (
      <li onClick={this.save}>
        <a href="javascript:void(0)">
          <i className="icon-save" />
        </a>
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {
    state,
    isShowPopup: state[REDUCER_NAME].saveLayout.isShowPopup,
  };
};

const mapDispatchToProps = {
  toggleSaveLayoutPopup,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SaveLayout);
