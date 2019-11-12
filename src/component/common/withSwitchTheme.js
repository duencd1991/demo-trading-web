import React from 'react';
import { connect } from 'react-redux';

const withSwitchTheme = settings => WrappedComponent => {
  class WithSwitchThemeChart extends React.Component {
    getSettings = () => {
      const { theme } = this.props;

      return settings[theme];
    };

    render() {
      return <WrappedComponent {...this.props} SETTINGS={this.getSettings()} />;
    }
  }

  const mapStateToProps = state => {
    return {
      theme: state.theme,
    };
  };

  return connect(mapStateToProps)(WithSwitchThemeChart);
};

export default withSwitchTheme;
