import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';

const NoData = ({ schema, noDataText }) => (
  <tbody>
    <tr>
      <td colSpan={schema.length}>
        <div className="no-data">
          {noDataText || <Translate value={'common.table.NO_DATA'} />}
        </div>
      </td>
    </tr>
  </tbody>
);

NoData.propTypes = {
  schema: PropTypes.array.isRequired,
  noDataText: PropTypes.string.isRequired,
};

export default NoData;
