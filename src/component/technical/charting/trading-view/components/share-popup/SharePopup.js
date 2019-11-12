import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SharePopupContent from './SharePopupContent';

const SharePopup = ({ changeSharePopupStatus, theme }) => (
  <div className={`share-popup ${theme}`}>
    <SharePopupContent changeSharePopupStatus={changeSharePopupStatus} />
  </div>
);

SharePopup.propTypes = {
  changeSharePopupStatus: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

const mapStateToProps = ({ theme }) => ({ theme });

export default connect(mapStateToProps)(SharePopup);
