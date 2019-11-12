import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class ToggleSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.isActive,
    };
  }

  toggle = () => {
    const { handleToggle } = this.props;
    const { isActive } = this.state;

    handleToggle(isActive);
    this.setState({ isActive: !isActive });
  };

  render() {
    const className = `toggle-switch-wrap ${
      this.state.isActive ? ' active' : ''
    }`;
    const { title } = this.props;
    return (
      <>
        <div className={className} onClick={this.toggle}>
          <div className="toggle-button" />
        </div>
        {title && (
          <span className="ml-5" onClick={this.toggle}>
            {title}
          </span>
        )}
      </>
    );
  }
}

ToggleSwitch.propTypes = {
  isActive: PropTypes.bool,
  handleToggle: PropTypes.func,
};

ToggleSwitch.defaultProps = {
  isActive: false,
  handleToggle: () => {},
};

export default ToggleSwitch;
