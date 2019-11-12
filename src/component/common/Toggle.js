import React from 'react';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';


class Toggle extends React.Component {
  state = {
    isShow: false,
  };

  toggle = () => {
    this.setState({ isShow: !this.state.isShow });
  };

  showHide = (isShow) => {
    this.setState({ isShow });
  };

  handleClickOutside = () => {
    if (this.state.isShow) {
      this.setState({ isShow: false });
    }
  };

  getClassName = () => {
    const { appendClassName } = this.props;

    return appendClassName.includes('position-relative')
      ? appendClassName.join(' ')
      : [...appendClassName, 'position-relative'].join(' ');
  };

  render() {
    const { renderAction, renderPopup } = this.props;
    const { isShow } = this.state;

    return (
      <div className={this.getClassName()}>
        {renderAction(this.toggle)}
        {renderPopup(this.showHide, isShow)}
      </div>
    );
  }
}

Toggle.propTypes = {
  renderAction: PropTypes.func.isRequired,
  renderPopup: PropTypes.func.isRequired,
  appendClassName: PropTypes.array,
};

Toggle.defaultProps = {
  renderAction: () => {
  },
  renderPopup: () => {
  },
  appendClassName: [],
};

export default enhanceWithClickOutside(Toggle);
