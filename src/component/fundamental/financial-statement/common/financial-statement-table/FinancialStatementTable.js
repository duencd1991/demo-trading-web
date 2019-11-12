import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import memoize from 'fast-memoize';
import { Translate } from 'react-redux-i18n';
import { THEMES } from '../../../../../configs/LayoutConfig';
import PortalTooltip from '../../../../common/portal-tooltip/PortalTooltip';
import { formatTextFloat, formatValueBillion } from '../../../../helpers/Text';
import { LEVELS, NUMBER_FLEXIBLE, TYPES } from '../../Const';
import Table from '../../../../common/table/Table';
import MiniBarChart from './MiniBarChart';
import StackChart from './StackChart';
import { incomeStatementMapping } from '../../income-statement/Const';
import { incomeStatementBankingMapping } from '../../income-statement/BankingConst';

const Plus = require('../../../../../assets/images/svg/fundamental/plus.svg');
const Minus = require('../../../../../assets/images/svg/fundamental/minus.svg');
const PlusBlack = require('../../../../../assets/images/svg/fundamental/plus_black.svg');
const MinusBlack = require('../../../../../assets/images/svg/fundamental/minus_black.svg');

const mapStatus = {
  [undefined]: true,
  [true]: false,
  [false]: true,
};

const ignoreFormatRows = [
  incomeStatementMapping.EPSBasis,
  incomeStatementMapping.EPSDiluted,
  incomeStatementBankingMapping.basicEarningsPerShareForProfitAttributableToTheEquityHolders,
];

const getAllAvailableIds = (rowGroup, dataByIds, id) => {
  if (!dataByIds[id].children || !rowGroup[id]) {
    return [id];
  }

  const allChild = dataByIds[id].children.reduce((result, childId) => {
    return result.concat(getAllAvailableIds(rowGroup, dataByIds, childId));
  }, []);

  return [id, ...allChild];
};

const memoizedGetAllAvailableIds = memoize(getAllAvailableIds);

const getRowGroup = (ids, dataByIds) => {
  return ids.reduce((result, id) => {
    if (!Array.isArray(dataByIds[id].children)) {
      return result;
    }

    return {
      ...result,
      ...getRowGroup(dataByIds[id].children, dataByIds),
      [id]: false,
    };
  }, {});
};

class FinancialStatementTable extends PureComponent {
  constructor(props) {
    super(props);
    const { fields, ids, dataByIds } = this.props;
    this.state = {
      startIndex: this.getStartIndex(fields),
      rowGroup: getRowGroup(ids, dataByIds),
      isExpandAll: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { fields, ids } = this.props;
    if (fields !== nextProps.fields) {
      this.setState({
        startIndex: this.getStartIndex(nextProps.fields),
      });
    }
    if (!ids.length && nextProps.ids.length) {
      this.setState({
        rowGroup: getRowGroup(nextProps.ids, nextProps.dataByIds),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { startIndex } = this.state;
    const { onStartIndexChange } = this.props;
    if (startIndex !== prevState.startIndex) {
      onStartIndexChange(startIndex);
    }
  }

  getStartIndex = fields => Math.max(fields.length - NUMBER_FLEXIBLE, 0);

  onPrevSchema = () => {
    const { startIndex } = this.state;
    this.setState({
      startIndex: Math.max(startIndex - 1, 0),
    });
  };

  onNextSchema = () => {
    const { startIndex } = this.state;
    const { fields } = this.props;
    this.setState({
      startIndex: Math.min(fields.length - NUMBER_FLEXIBLE, startIndex + 1),
    });
  };

  renderTimeColumn = (data, item) => {
    if (item.type === TYPES.CHART) {
      return data && typeof data === 'object' ? (
        <StackChart titles={item.titles} data={data} />
      ) : null;
    }
    let text = 0;
    if (data !== 0) {
      text = ignoreFormatRows.includes(item.id)
        ? data
        : formatTextFloat(formatValueBillion(data));
    }
    if (data === null) {
      text = '--';
    }

    return <div className="text-right">{text}</div>;
  };

  getSchemaTitle = item => {
    if (!item.key) {
      return <Translate value="financialStatement.noHeadTitle" />;
    }
    const { timeKey } = this.props;
    const key =
      timeKey === 'yearly'
        ? 'financialStatement.yearName'
        : 'financialStatement.quarterName';
    return <Translate quarter={item.quarter} year={item.year} value={key} />;
  };

  getFields = () => {
    const { startIndex } = this.state;
    const { fields } = this.props;
    if (!fields.length) {
      return [...Array(5)].map(() => ({}));
    }
    return fields.slice(startIndex, NUMBER_FLEXIBLE + startIndex);
  };

  getFlexibleSchema = () => {
    const { startIndex } = this.state;
    const { fields } = this.props;
    const isEnablePrev = startIndex > 0;
    const isEnableNext = startIndex < fields.length - NUMBER_FLEXIBLE;
    return this.getFields().map((item, index) => {
      const className = 'd-flex align-items-center justify-content-end';
      if (index === 0) {
        return {
          isHtml: true,
          disableSort: true,
          title: (
            <div className={className}>
              {isEnablePrev && (
                <i
                  onClick={this.onPrevSchema}
                  className="icon-caret-left mr-5"
                />
              )}
              {this.getSchemaTitle(item)}
            </div>
          ),
          thTooltip: this.getSchemaTitle(item),
          key: item.key,
          render: this.renderTimeColumn,
        };
      }
      if (index === NUMBER_FLEXIBLE - 1) {
        return {
          isHtml: true,
          disableSort: true,
          title: (
            <div className={className}>
              {this.getSchemaTitle(item)}
              {isEnableNext && (
                <i
                  onClick={this.onNextSchema}
                  className="icon-caret-right ml-5"
                />
              )}
            </div>
          ),
          thTooltip: this.getSchemaTitle(item),
          key: item.key,
          render: this.renderTimeColumn,
        };
      }

      return {
        disableSort: true,
        isHtml: true,
        key: item.key,
        title: <div className={className}>{this.getSchemaTitle(item)}</div>,
        thTooltip: this.getSchemaTitle(item),
        render: this.renderTimeColumn,
      };
    });
  };

  getPlusIcon = () => {
    const { theme } = this.props;
    return theme === THEMES.DARK ? Plus : PlusBlack;
  };

  getMinusIcon = () => {
    const { theme } = this.props;
    return theme === THEMES.DARK ? Minus : MinusBlack;
  };

  getExpandIcon = bool => {
    const { isExpandAll } = this.state;
    const MinusImg = this.getMinusIcon();
    const PlusImg = this.getPlusIcon();
    return (
      <img
        className="expand-status-icon"
        src={bool || isExpandAll ? MinusImg : PlusImg}
        alt="status"
      />
    );
  };

  toggleExpandStatus = id => {
    const { rowGroup, isExpandAll } = this.state;
    const { dataByIds } = this.props;
    if (!dataByIds[id].children) {
      return;
    }

    this.setState({
      isExpandAll: mapStatus[rowGroup[id]] ? isExpandAll : false,
      rowGroup: {
        ...rowGroup,
        [id]: mapStatus[rowGroup[id]],
      },
    });
  };

  renderRowTitle = (text, item) => {
    const { rowGroup } = this.state;
    const { i18nPrefix } = this.props;
    if (item.type === TYPES.CHART) {
      return (
        <div className="list-color">
          {item.titles.map(({ color, i18nKey }) => (
            <div key={color} className="d-flex align-items-center color-item">
              <div style={{ backgroundColor: color }} className="circle" />
              <PortalTooltip tooltip={<Translate value={i18nKey} />}>
                <Translate value={i18nKey} />
              </PortalTooltip>
            </div>
          ))}
        </div>
      );
    }

    return (
      <PortalTooltip
        tooltip={<Translate value={`${i18nPrefix}.${item.i18nKey}`} />}
      >
        <div
          onClick={() => this.toggleExpandStatus(item.id)}
          className={`fs-table-row level-${item.level}`}
        >
          {item.children && this.getExpandIcon(rowGroup[item.id])}
          <Translate value={`${i18nPrefix}.${item.i18nKey}`} />
        </div>
      </PortalTooltip>
    );
  };

  renderTrend = (text, item) => {
    const data = this.getFields().map(field => ({
      x: field.key,
      y: item[field.key],
    }));

    return item.type === TYPES.CHART ? '' : <MiniBarChart data={data} />;
  };

  toggleExpandAll = () => {
    const { isExpandAll, rowGroup } = this.state;
    const newRowGroup = Object.keys(rowGroup).reduce((result, id) => {
      return {
        ...result,
        [id]: !isExpandAll,
      };
    }, {});

    this.setState({
      rowGroup: newRowGroup,
      isExpandAll: !isExpandAll,
    });
  };

  getSchema = () => {
    const { isExpandAll } = this.state;
    const schema = [
      {
        disableSort: true,
        key: 'text',
        isHtml: true,
        title: (
          <div className="d-flex">
            <img
              className="expand-all"
              onClick={this.toggleExpandAll}
              src={isExpandAll ? Minus : Plus}
              alt="expand"
            />
            <Translate value="financialStatement.item" />
          </div>
        ),
        thTooltip: <Translate value="financialStatement.item" />,
        render: this.renderRowTitle,
        thStyle: {
          width: '200px',
        },
      },
      {
        disableSort: true,
        key: 'trend',
        title: 'financialStatement.trend',
        thStyle: {
          width: '25px',
        },
        render: this.renderTrend,
      },
    ];

    return schema.concat(this.getFlexibleSchema());
  };

  getIds = () => {
    const { rowGroup, isExpandAll } = this.state;
    const { dataByIds, ids } = this.props;
    return ids.reduce((result, id) => {
      if (dataByIds[id].level === LEVELS.PARENT) {
        if (rowGroup[id] || isExpandAll) {
          return result.concat(
            memoizedGetAllAvailableIds(rowGroup, dataByIds, id, isExpandAll),
          );
        }

        return result.concat(id);
      }

      return result;
    }, []);
  };

  render() {
    const { isLoading, height, getDataFromRedux } = this.props;

    return (
      <Table
        table={{
          height,
        }}
        isLoading={isLoading}
        resizeable={false}
        getDataFromRedux={getDataFromRedux}
        ids={this.getIds()}
        schema={this.getSchema()}
      />
    );
  }
}

FinancialStatementTable.propTypes = {
  ids: PropTypes.array.isRequired,
  timeKey: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  i18nPrefix: PropTypes.string,
  height: PropTypes.number.isRequired,
  getDataFromRedux: PropTypes.func.isRequired,
  onStartIndexChange: PropTypes.func,
  theme: PropTypes.string.isRequired,
};

FinancialStatementTable.defaultProps = {
  i18nPrefix: 'financialStatement',
  onStartIndexChange: () => {},
  isLoading: false,
};

const mapStateToProps = ({ theme }) => ({ theme });

export default connect(mapStateToProps)(FinancialStatementTable);
