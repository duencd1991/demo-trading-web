import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';

export default PopupHeader;

function PopupHeader(props) {
  const { warningIcon } = props;
  return (
    <div>
      {warningIcon && (
        <img style={{ paddingBottom: '4px' }} src={warningIcon} />
      )}
      <Translate value={props.title} />
    </div>
  );
}

PopupHeader.propTypes = {
  title: PropTypes.string,
};

PopupHeader.defaultProps = {
  title: '',
};
