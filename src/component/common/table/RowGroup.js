import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

class RowGroup extends PureComponent {
  state = {
    isShowRow: true,
  };

  toggleShowRow = () => {
    const { item } = this.props;
    if (!item.canToggle) {
      return;
    }
    this.setState(prev => ({
      isShowRow: !prev.isShowRow,
    }));
  };

  getGroupTd = () => {
    const { item, schema, stickyFirstColumn } = this.props;
    let content = '';
    if (stickyFirstColumn) {
      content = (
        <>
          <td colSpan={1}>
            <div className="group-list-date">{item.renderTitle()}</div>
          </td>
          <td colSpan={schema.length - 1} />
        </>
      );
      return content;
    }
    content = (
      <td colSpan={schema.length}>
        <div className="group-list-date">{item.renderTitle()}</div>
      </td>
    );
    return content;
  };

  render() {
    const { isShowRow } = this.state;
    const { item, schema, getDataFromRedux, stickyFirstColumn } = this.props;

    return (
      <>
        <tr onClick={this.toggleShowRow} style={item.rowStyle || {}}>
          {this.getGroupTd()}
        </tr>
        {isShowRow &&
          item.ids.map((id, rowIndex) => (
            <tr key={id}>
              <Row
                rowIndex={rowIndex}
                getDataFromRedux={getDataFromRedux}
                id={id}
                schema={schema}
                stickyFirstColumn={stickyFirstColumn}
              />
            </tr>
          ))}
      </>
    );
  }
}

RowGroup.propTypes = {
  schema: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  getDataFromRedux: PropTypes.func.isRequired,
};

export default RowGroup;
