import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDataFollowKeyByDot } from './../../helpers/Common';

class Row extends React.PureComponent {
  renderColumn = (item, col, colIndex, rowIndex) => {
    if (col.render && typeof col.render === 'function') {
      return col.render(getDataFollowKeyByDot(item, col.key), item, rowIndex);
    }
    return getDataFollowKeyByDot(item, col.key);
  };

  getStyle = (col) => (el) => {
    if (el && col.tdStyle) {
      Object.keys(col.tdStyle).forEach((key) => {
        el.style.setProperty(key, col.tdStyle[key], 'important');
      });
    }
  };

  render() {
    const { schema, item, rowIndex } = this.props;
    if (!item) {
      return null;
    }
    return (
      <>
        {schema.map((col, colIndex) => (
          <td
            ref={this.getStyle(col)}
            className={col.tdClassName}
            key={col.key}
          >
            {this.renderColumn(item, col, colIndex, rowIndex)}
          </td>
        ))}
      </>
    );
  }
}

const mapStateToProps = (state, { id, getDataFromRedux }) => {
  return {
    item: getDataFromRedux(state)[id],
  };
};

Row.propTypes = {
  item: PropTypes.object,
  rowIndex: PropTypes.number.isRequired,
};

Row.defaultProps = {
  item: {},
};

export default connect(mapStateToProps)(Row);
