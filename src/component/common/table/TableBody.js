import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import RowGroup from './RowGroup';

class TableBody extends PureComponent {
  state = {
    dragOverIndex: null,
  };

  onMouseEnter = e => {
    const tr = e.target.closest('tr');
    const { isTrHover = true } = this.props;
    const tbody = e.target.closest('tbody');
    if (tbody) {
      [...tbody.querySelectorAll('tr.hover')].forEach(trDom => {
        if (isTrHover) {
          trDom.classList.remove('hover');
        }
      });
    }
    if (isTrHover && tr) {
      tr.classList.add('hover');
    }
  };

  onMouseLeave = e => {
    const tr = e.target.closest('tr');
    const { isTrHover = true } = this.props;

    if (isTrHover && tr) {
      tr.classList.remove('hover');
    }
  };

  onDragStart = index => event => {
    event.dataTransfer.setData('text', 'drag row');
    this.currentIndex = index;
  };

  isDragging = () => {
    return typeof this.currentIndex === 'number';
  };

  onDragOver = index => event => {
    if (this.isDragging()) {
      event.preventDefault();
      this.setState({
        dragOverIndex: index,
      });
    }
  };

  onDrop = index => event => {
    event.preventDefault();
    const { reorder } = this.props;
    if (!this.isDragging() || index === this.currentIndex) {
      return;
    }
    reorder(this.currentIndex, index);
    this.currentIndex = null;
    this.setState({
      dragOverIndex: null,
    });
  };

  onDragEnd = () => {
    this.currentIndex = null;
    this.setState({
      dragOverIndex: null,
    });
  };

  render() {
    const { dragOverIndex } = this.state;
    const {
      ids,
      schema,
      draggable,
      widths,
      getDataFromRedux,
      groups,
      clickRow,
      idHover,
      isHighlight,
      stickyFirstColumn,
    } = this.props;

    if (groups) {
      return (
        <tbody>
          {groups.map((item, index) => (
            <RowGroup
              item={item}
              key={index}
              getDataFromRedux={getDataFromRedux}
              schema={schema}
              stickyFirstColumn={stickyFirstColumn}
            />
          ))}
        </tbody>
      );
    }

    return (
      <tbody>
        {ids.map((id, rowIndex) => {
          let className =
            id === idHover ? (isHighlight ? 'highlight' : 'hover') : '';
          className =
            dragOverIndex === rowIndex
              ? [className, 'dragover'].join(' ')
              : className;

          return (
            <tr
              ref={el => {
                if (idHover !== undefined) this.props.listRef[id] = el;
              }}
              className={className}
              draggable={draggable}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              key={id}
              onDragEnd={this.onDragEnd}
              onDragStart={this.onDragStart(rowIndex)}
              onDragOver={this.onDragOver(rowIndex)}
              onDrop={this.onDrop(rowIndex)}
              onClick={() => clickRow(id)}
            >
              <Row
                rowIndex={rowIndex}
                getDataFromRedux={getDataFromRedux}
                id={id}
                widths={widths}
                schema={schema}
              />
            </tr>
          );
        })}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  ids: PropTypes.array.isRequired,
  schema: PropTypes.array.isRequired,
  reorder: PropTypes.func,
  widths: PropTypes.object,
  draggable: PropTypes.bool.isRequired,
  getDataFromRedux: PropTypes.func,
  clickRow: PropTypes.func,
  stickyFirstColumn: PropTypes.bool.isRequired,
};

TableBody.defaultProps = {
  reorder: () => {},
  widths: {},
  getDataFromRedux: () => {},
  clickRow: id => {},
  stickyFirstColumn: true,
};

export default TableBody;
