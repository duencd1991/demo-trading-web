import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDataFollowKeyByDot } from '../../helpers/Common';
import Loading from '../loading/Loading';
import NoData from './NoData';
import TableBody from './TableBody';
import TableHead from './TableHead';
import './table.scss';
import ConstCommon from './../Const';
import ScrollComponent from './../ScrollComponent';
import { sort, sortGroup } from './helpers';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class Table extends React.Component {
  constructor(props) {
    super(props);
    const { hideColumns, ids, groups } = this.props;
    this.state = {
      schema: this.getSchema(hideColumns),
      hideColumns,
      sortState: {},
      ids,
      groups,
      isMounted: false,
    };
    this.listRef = {};
    this.tableThead = React.createRef();
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { hideColumns, ids, schema, groups } = this.props;
    if (ids !== nextProps.ids) {
      this.setState({
        ids: this.getIdsFromNextProps(nextProps),
      });
    }

    if (groups !== nextProps.groups) {
      this.setState({
        groups: this.getGroupsFromNextProps(nextProps),
      });
    }

    if (hideColumns !== nextProps.hideColumns) {
      this.setState({
        hideColumns: nextProps.hideColumns,
        schema: this.getSchema(nextProps.hideColumns),
      });
    }

    if (schema !== nextProps.schema) {
      this.setState({
        schema: this.getSchema(nextProps.hideColumns, nextProps),
      });
    }
  }

  getValueFromItemFunc = () => {
    const { sortState } = this.state;
    const { schema } = this.props;
    const [key] = Object.keys(sortState);
    const column = schema.find(item => item.key === key);
    if (
      column &&
      column.getValueFromItem &&
      typeof column.getValueFromItem === 'function'
    ) {
      return column.getValueFromItem;
    }

    return item => getDataFollowKeyByDot(item, key);
  };

  getIdsFromNextProps = nextProps => {
    const { sortState } = this.state;
    if (!Object.keys(sortState).length) {
      return nextProps.ids;
    }
    const [type] = Object.values(sortState);

    return sort({
      type,
      ids: nextProps.ids,
      data: nextProps.data,
      valueFromItem: this.getValueFromItemFunc(),
    });
  };

  getGroupsFromNextProps = nextProps => {
    const { sortState } = this.state;
    if (!Object.keys(sortState).length) {
      return nextProps.groups;
    }
    const [type] = Object.values(sortState);

    return sortGroup({
      type,
      groups: nextProps.groups,
      data: nextProps.data,
      valueFromItem: this.getValueFromItemFunc(),
    });
  };

  getTheadHeight = () => {
    return this.tableThead.current ? this.tableThead.current.clientHeight : 0;
  };

  scrollView = idHover => {
    if (this.props.scrollRef.current) {
      this.props.scrollRef.current.view.scroll({
        top: this.listRef[idHover].offsetTop - this.getTheadHeight(),
        behavior: 'smooth',
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { idHover } = this.props;
    if (idHover && idHover !== prevProps.idHover) {
      this.scrollView(idHover);
    }
  }

  reorderColumn = (startIndex, targetIndex) => {
    const { schema } = this.state;
    this.setState({
      schema: reorder(schema, startIndex, targetIndex),
    });
  };

  reorderRow = (startIndex, targetIndex) => {
    const { ids } = this.state;
    this.setState({
      ids: reorder(ids, startIndex, targetIndex),
    });
  };

  getSchema = (hideColumns, props) => {
    let { schema } = this.props;
    if (props) {
      schema = props.schema;
    }
    return schema.filter(col => !hideColumns.includes(col.key));
  };

  getClassName = () => {
    const { className, multiHead, stickyHead, stickyFirstColumn } = this.props;
    let classNameTable =
      'custom-table scroll-table table-striped border-table w-100';
    if (multiHead) {
      if (multiHead.isBlack) {
        classNameTable = [
          classNameTable,
          'text-center table-hose table-hose-bid',
        ].join(' ');
      } else {
        classNameTable = [classNameTable, 'text-center table-hose'].join(' ');
      }
    } else {
      classNameTable = [classNameTable, 'table-wl-summary'].join(' ');
    }

    if (className) {
      classNameTable = className;
    }

    if (stickyHead) {
      classNameTable += ' table-sticky-head';
    }

    if (stickyFirstColumn) {
      classNameTable += ' table-sticky-first-column';
    }

    return classNameTable;
  };

  getTableStyle = () => {
    const { tableWidth } = this.state;
    if (!tableWidth) {
      return {};
    }

    return {
      minWidth: tableWidth,
    };
  };

  sort = (newIds, sortState) => {
    const { groups } = this.state;
    const { onSort } = this.props;
    onSort(sortState);
    if (groups) {
      this.setState({
        groups: newIds,
        sortState,
      });
      return;
    }

    this.setState({
      ids: newIds,
      sortState,
    });
  };

  renderBody = () => {
    const { schema, ids, groups } = this.state;
    const {
      clickRow,
      rowDraggable,
      getDataFromRedux,
      isLoading,
      isTrHover,
      idHover,
      isHighlight,
      noDataText,
      stickyFirstColumn,
    } = this.props;
    const isNoData = !ids.length || (groups && !groups.length);
    if (
      (!isLoading && isNoData && !groups) ||
      (!isLoading && groups && !groups.length)
    ) {
      return <NoData noDataText={noDataText} schema={schema} />;
    }

    return (
      <TableBody
        listRef={this.listRef}
        getDataFromRedux={getDataFromRedux}
        draggable={rowDraggable}
        reorder={this.reorderRow}
        schema={schema}
        ids={ids}
        groups={groups}
        clickRow={clickRow}
        isTrHover={isTrHover}
        idHover={idHover}
        isHighlight={isHighlight}
        stickyFirstColumn={stickyFirstColumn}
      />
    );
  };

  calculateHeightTable = () => {
    const { table } = this.props;
    return table &&
      table.height &&
      table.height >= ConstCommon.MIN_SCROLL_HEIGHT_TABLE
      ? table.height
      : '100%';
  };

  onScroll = e => {
    const { onScrollFunction } = this.props;
    onScrollFunction(e);

    if (this.mouseEnter) {
      this.showScroll();
    }
  };

  clearAddHover = () => {
    const { changeIdHover } = this.props;

    changeIdHover('');
  };

  render() {
    const {
      ids,
      schema,
      widths,
      tableWidth,
      isMounted,
      groups,
      sortState,
    } = this.state;
    const {
      columnDraggable,
      getDataFromRedux,
      multiHead,
      stickyFirstColumn,
      isLoading,
      hideColumns,
      thValign,
      resizeable,
      onScrollFunction,
      isShowHeadLoading,
      scrollRef,
    } = this.props;

    const rootStyle = isLoading
      ? {
          userSelect: 'none',
          pointerEvents: 'none',
        }
      : {};

    return (
      <div
        style={rootStyle}
        className="data-table-wrap h-100 position-relative"
      >
        {isLoading && <Loading />}
        <ScrollComponent
          theadHeight={this.getTheadHeight()}
          appendStyle={{ height: this.calculateHeightTable() }}
          appendHandleScroll={onScrollFunction}
          scrollRef={scrollRef}
        >
          <div
            className={isLoading ? 'table-loading-blur' : ''}
            style={{
              position: 'relative',
            }}
          >
            <table
              onMouseMove={this.clearAddHover}
              style={this.getTableStyle()}
              ref={el => (this.table = el)}
              className={this.getClassName()}
            >
              {(ids.length === 0 && isShowHeadLoading) || (
                <TableHead
                  sortState={sortState}
                  groups={groups}
                  isMounted={isMounted}
                  tableThead={this.tableThead}
                  thValign={thValign}
                  hideColumns={hideColumns}
                  widths={widths}
                  resizeable={resizeable}
                  tableWidth={tableWidth}
                  stickyFirstColumn={stickyFirstColumn}
                  ids={ids}
                  draggable={columnDraggable}
                  schema={schema}
                  setWidth={this.setWidth}
                  reorder={this.reorderColumn}
                  onSort={this.sort}
                  getDataFromRedux={getDataFromRedux}
                  multiHead={multiHead}
                />
              )}
              {this.renderBody()}
            </table>
          </div>
        </ScrollComponent>
      </div>
    );
  }
}

Table.propTypes = {
  ids: PropTypes.array,
  schema: PropTypes.array,
  columnDraggable: PropTypes.bool,
  rowDraggable: PropTypes.bool,
  resizeable: PropTypes.bool,
  hideColumns: PropTypes.array,
  getDataFromRedux: PropTypes.func.isRequired,
  onSort: PropTypes.func,
  onScrollFunction: PropTypes.func,
  groups: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  stickyFirstColumn: PropTypes.bool,
  stickyHead: PropTypes.bool,
  isLoading: PropTypes.bool,
  clickRow: PropTypes.func,
  thValign: PropTypes.string,
  noDataText: PropTypes.string,
  scrollRef: PropTypes.object,
  changeIdHover: PropTypes.func,
};

Table.defaultProps = {
  ids: [],
  schema: [],
  hideColumns: [],
  columnDraggable: false,
  rowDraggable: false,
  resizeable: true,
  onReorderRow: () => {},
  onSort: () => {},
  onScrollFunction: () => {},
  groups: false,
  stickyFirstColumn: true,
  stickyHead: true,
  onResize: () => {},
  isLoading: false,
  clickRow: id => {},
  thValign: 'center',
  noDataText: '',
  scrollRef: React.createRef(),
  changeIdHover: () => {},
};

const mapStateToProps = (state, { getDataFromRedux }) => ({
  data: getDataFromRedux(state),
});

export default connect(
  mapStateToProps,
  {},
  null,
  { forwardRef: true },
)(Table);
