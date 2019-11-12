import PropTypes from 'prop-types';
import React from 'react';
import SaveTemplateContent from './SaveTempateContent';

const SaveTemplatePopup = ({ changeSaveTemplateStatus }) => (
  <div className="save-template-popup">
    <SaveTemplateContent
      changeSaveTemplateStatus={changeSaveTemplateStatus}
    />
  </div>
);

SaveTemplatePopup.propTypes = {
  changeSaveTemplateStatus: PropTypes.func.isRequired,
};

export default SaveTemplatePopup;
