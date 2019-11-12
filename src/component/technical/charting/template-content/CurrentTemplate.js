import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';
import PopConfirm from '../../../common/pop-confirm/PopConfirm';

const CurrentTemplate = ({ item, onLoadTemplate, onDeleteTemplate }) => (
  <div className="current-template">
    <div className="current-template-wrapper">
      <div className="template-image">
        <img className="w-100" src={item.thumbnails} alt={item.name} />
      </div>
      <div className="name">{item.name}</div>
      <div className="description">{item.description}</div>
      <div className="btn-wrapper d-flex">
        <div
          onClick={() => onLoadTemplate(item.layout, item.chartLayoutId)}
          className="btn btn-cus-nomal bg-b-color-3 load-btn"
        >
          <Translate value="charting.loadTemplate" />
        </div>
        <PopConfirm onOk={() => onDeleteTemplate(item.chartLayoutId)}>
          <div className="btn btn-cus-nomal bg-b-color-3 delete-btn">
            <Translate value="charting.deleteTemplate" />
          </div>
        </PopConfirm>
      </div>
    </div>
  </div>
);

CurrentTemplate.propTypes = {
  item: PropTypes.object,
  onLoadTemplate: PropTypes.func,
  onDeleteTemplate: PropTypes.func,
};

CurrentTemplate.defaultProps = {
  item: {},
  onLoadTemplate: () => {},
};

export default CurrentTemplate;
