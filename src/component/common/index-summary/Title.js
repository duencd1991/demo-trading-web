import React from 'react';
import PropTypes from 'prop-types';

class Title extends React.Component {
  render() {
    const { title, style } = this.props;

    return (
      <h1 className="left-info-widget__title" style={style}>
        {title}
      </h1>
    );
  }
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Title.defaultProps = {
  title: '',
  style: {},
};

export default Title;
