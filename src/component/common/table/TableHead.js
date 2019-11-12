import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDataFollowKeyByDot } from '../../helpers/Common';
import { COMPONENT_RESIZE } from '../GoldenLayoutWrapper';
import ThTooltip from './ThTooltip';
import Sort from './Sort';
import { getNextIndex, getPrevIndex, sort, sortGroup } from './helpers';
import { debounce } from 'lodash';
import { I18n } from 'react-redux-i18n';

const MIN_WIDTH = 100;
const RESIZE_WAIT = 10;

export const SORT_TYPES = {
  ASC: 'asc',
  DESC: 'desc',
};

const sortStateMap = {
  [undefined]: SORT_TYPES.ASC,
  [SORT_TYPES.ASC]: SORT_TYPES.DESC,
  [SORT_TYPES.DESC]: SORT_TYPES.ASC,
};

class TableHead extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isResize: false,
    };
    this.initWidths = {};
    this.widths = {};
    this.tableWidth = null;
    this.columnRefs = {};
    this.reCalcWidth = debounce(this.onWindowResize, RESIZE_WAIT);
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.onResizeColumn);
    window.addEventListener('mouseup', this.onStopResizeColumn);
    window.addEventListener(COMPONENT_RESIZE, this.reCalcWidth);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { hideColumns, isMounted, schema, ids, groups } = this.props;
    const isColumnChange = schema.length !== prevProps.schema.length;
    const isHideColumnChange =
      hideColumns.length !== prevProps.hideColumns.length;
    const hasNewData = ids !== prevProps.ids && !prevProps.ids.length;
    const hasNewGroup = groups !== prevProps.groups && !prevProps.groups.length;

    if (isHideColumnChange || isColumnChange || hasNewData || hasNewGroup) {
      this.onWindowResize();
    }
    if (isMounted && !prevProps.isMounted) {
      this.calcWidths();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onResizeColumn);
    window.removeEventListener('mouseup', this.onStopResizeColumn);
    window.removeEventListener(COMPONENT_RESIZE, this.reCalcWidth);
    clearTimeout(this.timeoutWidth);
  }

  disableResizeColumn = () => {
    const { schema } = this.props;
    Object.keys(this.columnRefs).forEach(key => {
      const column = schema.find(col => col.key === key);
      if (!column || !this.columnRefs[key]) {
        return;
      }
      this.columnRefs[key].style.removeProperty('width');
      this.columnRefs[key].style.removeProperty('min-width');
      if (column.thStyle && column.thStyle.width) {
        this.columnRefs[key].style.width = column.thStyle.width;
      }
    });
    if (this.thead) {
      this.thead.closest('table').style.removeProperty('min-width');
    }
  };

  onWindowResize = () => {
    const { isMounted } = this.props;
    if (isMounted) {
      this.disableResizeColumn();
      this.calcWidths();
    }
  };

  canDrag = colIndex => {
    const { draggable, stickyFirstColumn } = this.props;
    if (!draggable) {
      return false;
    }
    return !(stickyFirstColumn && colIndex === 0);
  };

  calcWidths = () => {
    const widthData = Object.keys(this.columnRefs).reduce(
      (result, key) => {
        if (!this.columnRefs[key]) {
          return result;
        }
        const colWidth =
          this.columnRefs[key].clientWidth || this.initWidths[key];
        return {
          widths: {
            ...result.widths,
            [key]: colWidth,
          },
          tableWidth: result.tableWidth + colWidth,
        };
      },
      { widths: {}, tableWidth: 0 },
    );
    this.initWidths = widthData.widths;
    this.initableWidth = this.thead
      ? this.thead.closest('table').scrollWidth
      : 0;
    this.changeTableStyle(widthData);
  };

  onDragStart = index => e => {
    e.dataTransfer.setData('text', 'drag column');
    const { isResize } = this.state;
    if (!this.canDrag(index) || isResize) {
      e.preventDefault();
    }
    this.dragColumnIndex = index;
  };

  onDragOver = index => e => {
    if (this.dragColumnIndex) {
      e.preventDefault();
    }
    const { schema } = this.props;
    const column = schema[index];
    const isNotDragging =
      this.dragColumnIndex === null || this.dragColumnIndex === undefined;
    if (
      isNotDragging ||
      index === this.dragColumnIndex ||
      !this.canDrag(index)
    ) {
      return;
    }
    if (!this.columnRefs[column.key]) {
      return;
    }
    const targetRect = this.columnRefs[column.key].getBoundingClientRect();
    const middle = (targetRect.right - targetRect.left) / 2;
    const hoverClientX = e.clientX - targetRect.left;
    if (this.dragColumnIndex < index && hoverClientX < middle) {
      return;
    }

    if (this.dragColumnIndex > index && hoverClientX > middle) {
      return;
    }
    this.swapColumn(index);
  };

  onDragEnd = () => {
    this.dragColumnIndex = null;
  };

  swapColumn = index => {
    const { reorder } = this.props;
    reorder(this.dragColumnIndex, index);
    this.dragColumnIndex = index;
  };

  getNewIds = (key, valueFromItem, type) => {
    const { ids, data, groups } = this.props;

    let getValueFromItem = item => getDataFollowKeyByDot(item, key);
    if (valueFromItem && typeof valueFromItem === 'function') {
      getValueFromItem = valueFromItem;
    }

    if (groups) {
      return sortGroup({
        groups,
        data,
        type,
        valueFromItem: getValueFromItem,
      });
    }

    return sort({
      ids,
      data,
      type,
      valueFromItem: getValueFromItem,
    });
  };

  changeSortState = ({ key, disableSort, valueFromItem }) => e => {
    if (disableSort || e.target.contains(this.resizeEl)) {
      return;
    }
    e.preventDefault();
    const { onSort, sortState } = this.props;
    const type = sortStateMap[sortState[key]];
    onSort(this.getNewIds(key, valueFromItem, type), {
      [key]: type,
    });
  };

  onResizeStart = key => e => {
    this.setState({
      isResize: true,
    });
    this.key = key;
    this.clientX = e.clientX;
  };

  isAlMostDisableResize = () => {
    const { schema } = this.props;
    const disableResizeSchema = schema.filter(col => col.disableResize);

    return schema.length === disableResizeSchema.length + 1;
  };

  canResize = e => {
    const { isResize } = this.state;
    const minWidth = Math.min(MIN_WIDTH, this.initWidths[this.key]);
    const isLessThanMinWidth =
      this.widths[this.key] + (e.clientX - this.clientX) < minWidth;

    return !(!isResize || !this.key || isLessThanMinWidth);
  };

  onResizeColumn = e => {
    const { schema } = this.props;
    if (!this.canResize(e)) {
      this.setState({
        isResize: false,
      });

      return;
    }
    const minWidth = Math.min(MIN_WIDTH, this.initWidths[this.key]);
    const newWidth = Math.max(
      this.widths[this.key] + (e.clientX - this.clientX),
      minWidth,
    );
    const diff = newWidth - this.widths[this.key];
    const newTableWidth = this.tableWidth + diff;
    const obj = {};
    if (newTableWidth < this.initableWidth) {
      const currentIndex = schema.findIndex(col => col.key === this.key);
      const nextIndex = getNextIndex(schema, currentIndex);
      if (!nextIndex) {
        const prevIndex = getPrevIndex(schema, currentIndex);
        if (prevIndex) {
          obj[schema[prevIndex].key] =
            this.widths[schema[prevIndex].key] - diff;
        }
      } else {
        obj[schema[nextIndex].key] = this.widths[schema[nextIndex].key] - diff;
      }
    }
    this.changeTableStyle({
      key: this.key,
      widths: {
        ...this.widths,
        [this.key]: newWidth,
        ...obj,
      },
      tableWidth: Math.max(
        this.tableWidth + (newWidth - this.widths[this.key]),
        this.initableWidth,
      ),
    });
    this.clientX = e.clientX;
    const col = schema.find(column => column.key === this.key);
    if (col.onResize && typeof col.onResize === 'function') {
      col.onResize(newWidth);
    }
  };

  changeTableStyle = ({ widths, tableWidth }) => {
    Object.keys(widths).forEach(key => {
      if (!this.columnRefs[key]) {
        return;
      }
      if (widths[key] !== this.widths[key]) {
        this.columnRefs[key].style.width = `${widths[key]}px`;
        this.columnRefs[key].style.minWidth = `${widths[key]}px`;
      }
    });
    this.widths = widths;
    this.tableWidth = tableWidth;
  };

  onStopResizeColumn = () => {
    this.setState({
      isResize: false,
    });
    this.key = null;
  };

  getTooltipText = title => {
    try {
      if (typeof title === 'string') {
        return title.replace(/<[\w,/]*>/g, ''); // get only text when title is dangerouslySetInnerHTML
      }

      if (Array.isArray(title.props.children)) {
        return title.props.children[0];
      }

      return I18n.t(title.props.children);
    } catch (e) {
      return '';
    }
  };

  getStyle = col => {
    const { isResize } = this.state;
    const { thValign } = this.props;
    return {
      ...col.thStyle,
      position: 'relative',
      verticalAlign: thValign,
      cursor: isResize && this.key === col.key ? 'col-resize' : 'default',
      ...(this.widths[col.key] ? { width: this.widths[col.key] } : {}),
      height: 1,
    };
  };

  render() {
    const {
      schema,
      multiHead,
      resizeable,
      tableThead,
      sortState,
      ids,
    } = this.props;

    return (
      <thead ref={el => (this.thead = el)}>
        {multiHead && (
          <tr>
            <th colSpan={Object.keys(schema).length} className="fs-14">
              <strong>{multiHead.name}</strong>
            </th>
          </tr>
        )}
        <tr ref={tableThead}>
          {schema.map((col, colIndex) => {
            const title = col.isHtml ? col.title : I18n.t(col.title);
            const displayTitle =
              typeof title === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: title }} />
              ) : (
                title
              );
            const tooltip = col.thTooltip || this.getTooltipText(title);
            return (
              <th
                key={colIndex}
                ref={el => (this.columnRefs[col.key] = el)}
                style={this.getStyle(col)}
              >
                <div
                  className="h-100"
                  onClick={this.changeSortState(col)}
                  style={{
                    ...(!col.disableSort && sortState[col.key]
                      ? { marginRight: 13 }
                      : {}),
                  }}
                  onDragStart={this.onDragStart(colIndex)}
                  onDragOver={this.onDragOver(colIndex)}
                  onDrop={e => e.preventDefault()}
                  onDragEnd={this.onDragEnd}
                  draggable={this.canDrag(colIndex)}
                >
                  {tooltip ? (
                    <ThTooltip tooltip={tooltip}>{displayTitle}</ThTooltip>
                  ) : (
                    displayTitle
                  )}

                  {!col.disableSort && sortState[col.key] && (
                    <Sort type={sortState[col.key]} />
                  )}
                </div>
                {resizeable &&
                !col.disableResize &&
                !this.isAlMostDisableResize() &&
                ids.length ? (
                  <div
                    ref={el => (this.resizeEl = el)}
                    onMouseDown={this.onResizeStart(col.key)}
                    style={{
                      height: '100%',
                      display: 'inline-block',
                      width: 8,
                      cursor: 'col-resize',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                  />
                ) : null}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

TableHead.propTypes = {
  schema: PropTypes.array.isRequired,
  reorder: PropTypes.func,
  draggable: PropTypes.bool.isRequired,
  resizeable: PropTypes.bool,
  onSort: PropTypes.func,
  ids: PropTypes.array,
  stickyFirstColumn: PropTypes.bool.isRequired,
  getDataFromRedux: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  hideColumns: PropTypes.array,
  thValign: PropTypes.string.isRequired,
  isMounted: PropTypes.bool.isRequired,
  sortState: PropTypes.object.isRequired,
};

TableHead.defaultProps = {
  reorder: () => {},
  setWidth: () => {},
  resizeable: true,
  onSort: () => {},
  ids: [],
  hideColumns: [],
  data: {},
};

const mapStateToProps = (state, { getDataFromRedux }) => ({
  i18n: state.i18n,
  data: getDataFromRedux(state),
});

export default connect(mapStateToProps)(TableHead);
