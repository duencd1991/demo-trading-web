import React from 'react';
import PopupPE from './../popup/popup-pe';
import { connect } from 'react-redux';
import { REDUCER_NAME, getAveragePE } from './../../reducer';
import './pen-icon.scss';
import enhanceWithClickOutside from 'react-click-outside';

class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPopup: false,
    };
  }

  getAveragePe = average => {
    const { getAveragePE } = this.props;
    getAveragePE(average);
    this.setState({ isShowPopup: false });
  };

  handleClickOutside = () => {
    if (this.state.isShowPopup) {
      this.setState({ isShowPopup: false });
    }
  };

  handleClick = () => {
    this.setState({ isShowPopup: !this.state.isShowPopup });
  };

  render() {
    const { isShowPopup } = this.state;

    return (
      <div>
        <i
          style={{ cursor: 'pointer' }}
          className="icon-edit"
          onClick={this.handleClick}
        />{' '}
        {isShowPopup && <PopupPE finishCaculate={this.getAveragePe} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    averagePE: state[REDUCER_NAME].averagePE,
  };
};

const mapDispatchToProps = {
  getAveragePE,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(enhanceWithClickOutside(Icon));
