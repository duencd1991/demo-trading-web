import React from 'react';
import PropTypes from 'prop-types';
import { SORT_TYPES } from './TableHead';

const Sort = ({ type }) => (
  <div className="d-inline-block sort-status">
    <div
      className={`sort-up ${
        SORT_TYPES.ASC === type ? 'table-sort-active' : ''
      }`}
    />
    <div
      className={`sort-down ${
        SORT_TYPES.DESC === type ? 'table-sort-active' : ''
      }`}
    />
  </div>
);

Sort.propTypes = {
  type: PropTypes.string,
};

Sort.defaultProps = {
  type: '',
};

export default Sort;
