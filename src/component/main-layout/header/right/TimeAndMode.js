import React from 'react';
import { ToggleSwitch } from './../../../common/toggle-switch';
import { THEMES } from '../../../../configs/LayoutConfig';
import { changeTheme } from '../../../app/reducer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Time from './Time';

class TimeAndMode extends React.Component {
  changeTheme = () => {
    const { changeTheme } = this.props;

    if (document.body.className === 'light-mode') {
      changeTheme(THEMES.DARK);
      document.body.classList.remove('light-mode');
    } else {
      changeTheme(THEMES.LIGHT);
      document.body.classList.add('light-mode');
    }
  };

  render() {
    return (
      <div className="time-and-mode">
        <Time />
        <div className="mode">
          <span>
            <i className="icon-sun" />
          </span>
          <span className="ml-1 mr-1">
            <ToggleSwitch isActive={true} handleToggle={this.changeTheme} />
          </span>
          <span>
            <i className="icon-moon" />
          </span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  changeTheme,
};

TimeAndMode.propTypes = {
  changeTheme: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(TimeAndMode);
