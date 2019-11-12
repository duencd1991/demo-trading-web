import React from 'react';
import { Translate } from 'react-redux-i18n';
import PropTypes from 'prop-types';

const ListTemplate = ({ items, onItemClick }) => (
  <div className="list-template">
    {items.map((item, index) => (
      <div
        onClick={() => onItemClick(index)}
        className="template-item"
        key={index}
      >
        <div className="template-image">
          <img alt={item.name} src={item.thumbnails} />
        </div>
        <div className="template-name">{item.name}</div>
      </div>
    ))}
  </div>
);

ListTemplate.propTypes = {
  items: PropTypes.array,
  onItemClick: PropTypes.func,
};

ListTemplate.defaultProps = {
  items: [],
  onItemClick: () => {},
};

export default ListTemplate;
