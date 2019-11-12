import React from 'react';
import PropTypes from 'prop-types';
import { Translate, I18n } from 'react-redux-i18n';
import './index.scss';
import calculateSize from 'calculate-size';

class LabelLeftRight extends React.Component {
  getStyle = text => {
    return {
      top: `calc(50% + ${calculateSize(text, {
        fontWeight: 'normal',
        fontSize: '0.75rem',
      }).width / 2}px)`,
    };
  };

  render() {
    const { text, position } = this.props;

    return (
      <span
        className={`label-${position}-wrap`}
        style={this.getStyle(I18n.t(text))}
      >
        <Translate value={text} />
      </span>
    );
  }
}

LabelLeftRight.propTypes = {
  text: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};

LabelLeftRight.defaultProps = {
  text: '',
  position: 'left',
};

export default LabelLeftRight;
