import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';
import { getUnique } from './../../helpers/Common';

class TableFooter extends PureComponent {
  render() {
    const { listTextLang, appendStyle } = this.props;

    return (
      <div className="unit-title-note" style={appendStyle}>
        {listTextLang.map((item, index) => {
          return (
            <Translate
              key={getUnique() + index}
              value={item.text}
              style={item.style}
            />
          );
        })}
      </div>
    );
  }
}

TableFooter.propTypes = {
  listTextLang: PropTypes.array,
  appendStyle: PropTypes.object,
};

TableFooter.defaultProps = {
  listTextLang: [
    {
      text: 'common.table.TABLE_FOOTER_TEXT',
      style: {},
    },
  ],
  appendStyle: {
    marginTop: 6,
    marginBottom: 6,
  },
};

export default TableFooter;
