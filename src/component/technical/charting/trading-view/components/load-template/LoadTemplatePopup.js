import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TemplateContent from '../../../template-content/TemplateContent';

const LoadTemplatePopup = ({ changePopUpStatus, theme }) => (
  <div className="template-popup">
    <div className={`content ${theme}`}>
      <TemplateContent changePopUpStatus={changePopUpStatus} />
    </div>
  </div>
);

LoadTemplatePopup.propTypes = {
  changePopUpStatus: PropTypes.func,
  theme: PropTypes.string.isRequired,
};

TemplateContent.defaultProps = {
  changePopUpStatus: () => {},
};

const mapStateToProps = ({ theme }) => ({ theme });

export default connect(mapStateToProps)(LoadTemplatePopup);
