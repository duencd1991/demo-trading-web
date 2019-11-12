import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { topRate, typeChart } from './Const';
import Table from '../../common/table/Table';
import MiniAreaChart from './miniChart/MiniAreaChart';
import TooltipBod from './tooltip/TooltipBoD';
import HeaderTable from './headerTable/HeaderTable';
import CellHover from './cell-hover/CellHover';
import { getColorLevelsInAssessment } from '../../helpers/Color';
import {
  getColorPrice,
  getIconPriceFollowReferencePrice,
} from '../../helpers/Color';
import ToggleSwitch from '../toggle-switch/ToggleSwitch';
import moment from 'moment';
import './STTable.scss';
import Const from './Const';
import MixHeaderTitle from './headerTable/MixHeaderTitle';
import TradingViewUrl from '../../common/TradingViewUrl';
import { I18n } from 'react-redux-i18n';
import PopupRemove from '../popup-portal/popup-remove/PopupRemove';

const _format = require('string-format');
_format.extend(String.prototype, {});

class STTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.scrollRef = React.createRef();
  }

  compareRanking(rank, prevRank) {
    if (rank === prevRank) {
      return 'rank-balance mr-5';
    } else if (rank > prevRank) {
      return 'rank-up mr-5';
    } else {
      return 'rank-down mr-5';
    }
  }
  getClassColorText = (isSetColorText, text) => {
    return (
      (isSetColorText ? getColorLevelsInAssessment(text) : '') +
      ` text-overflow-eclipse `
    );
  };
  getIconGraph = (isIconGraph, code, text) => {
    return isIconGraph ? (
      <>
        <TradingViewUrl code={code || ''} />
        <span className="ml-5">{text}</span>
      </>
    ) : (
      <> {text}</>
    );
  };
  renderFullTicker = (itemColumn, item, styleClassName, iconGraph) => {
    const value = item[itemColumn.keyCompare];
    const prevFunction = itemColumn.keyPrevCompare;
    const organShortName = item[itemColumn.keyOrganShortName];
    const mameAndExchange = item[itemColumn.keyNameAndExchange];
    const classColor = getColorPrice(value, prevFunction(item)) + ' mr-5';
    const classIcon =
      getIconPriceFollowReferencePrice(value, prevFunction(item)) + ' mr-5';
    return (
      <div className="full-ticker-detail">
        <span className={classColor}>
          <i className={classIcon} />
        </span>
        <span className={styleClassName}>{iconGraph}</span>
        <span className="full-ticker-detail-name ml-5 text-overflow-eclipse">
          {organShortName}{' '}
        </span>
        <span className="full-ticker-detail-name-exchange">
          /{mameAndExchange}{' '}
        </span>
      </div>
    );
  };
  getSchema = (i18nTitleKey, listColumn) => {
    const { colorLeft, colorRight } = this.props;
    return listColumn.map(itemColumn => {
      const key = itemColumn.key;
      const title = `${i18nTitleKey}.${key}`;
      const result = {
        key,
        title,
      };

      if (key === itemColumn.key) {
        let styleDiv = {
          textAlign: itemColumn.textAlign,
          width: itemColumn.width,
          height: itemColumn.height,
        };
        const classDiv = itemColumn.isTopRate ? 'top-rate' : '';
        return {
          ...result,
          disableSort: itemColumn.isDisSort,
          isHtml: true,
          title:
            itemColumn.key === Const.INDUSTRY ? (
              <MixHeaderTitle
                listIndustry={this.props.listIndustry}
                chooseItem={this.props.chooseItem}
              >
                {title}
              </MixHeaderTitle>
            ) : (
              I18n.t(title)
            ),
          thStyle: {
            textAlign: itemColumn.textAlign,
            width: itemColumn.width,
          },
          tdStyle: {
            height: '1px',
          },
          render: (text, item) => {
            let styleClassName = this.getClassColorText(
              itemColumn.isSetColorText,
              text,
            );
            const orgCode = item[itemColumn.keyOrgCode];
            text = itemColumn.format ? itemColumn.format(text) : text;
            let iconGraph = this.getIconGraph(
              itemColumn.isIconGraph,
              orgCode,
              text,
            );
            if (itemColumn.typeTooltip) {
              return (
                <div style={styleDiv}>
                  <TooltipBod
                    code={item[itemColumn.keyOrgCode]}
                    ticker={text}
                    parentRef={this.scrollRef}
                    title={text}
                    colorLeft={colorLeft}
                    colorRight={colorRight}
                    typeTooltip={itemColumn.typeTooltip}
                  >
                    {itemColumn.isShowFullTicker &&
                      this.renderFullTicker(
                        itemColumn,
                        item,
                        styleClassName,
                        iconGraph,
                      )}
                    {!itemColumn.isShowFullTicker && (
                      <span
                        className={styleClassName}
                        style={{ width: '100%' }}
                      >
                        {iconGraph}
                      </span>
                    )}
                  </TooltipBod>
                </div>
              );
            } else if (itemColumn.isRanking) {
              return (
                <div style={styleDiv}>
                  <span>
                    {' '}
                    {item[itemColumn.keyRank]} / {item[itemColumn.keyTotalRank]}{' '}
                  </span>
                </div>
              );
            } else if (itemColumn.typeChart) {
              return (
                <div style={styleDiv}>
                  {itemColumn.typeChart === typeChart.areaChart && (
                    <MiniAreaChart data={text} />
                  )}
                </div>
              );
            } else if (itemColumn.isToggleSwitch) {
              return (
                <div className="text-center">
                  <ToggleSwitch
                    isActive={
                      item[itemColumn.keyIsActive]
                        ? item[itemColumn.keyIsActive]
                        : false
                    }
                    handleToggle={
                      this.props.handleToggle
                        ? this.props.handleToggle
                        : () => {}
                    }
                  />
                </div>
              );
            } else if (itemColumn.isModify) {
              return (
                <div className="text-center">
                  <i
                    onClick={
                      this.props.handleModify
                        ? this.props.handleModify
                        : () => {}
                    }
                    className="icon-pencil-edit"
                  />
                </div>
              );
            } else if (itemColumn.isRemove) {
              return (
                <div className="text-center">
                  <PopupRemove
                    handleDelete={
                      this.props.handleDelete
                        ? this.props.handleDelete
                        : () => {}
                    }
                    {...this.props.objectConfirmDel}
                  />
                </div>
              );
            } else if (
              itemColumn.isTopRate &&
              (text === 1 || text === 2 || text === 3)
            ) {
              let colorOvalLeft =
                text === 1
                  ? topRate.top1.colorOvalLeft
                  : text === 2
                  ? topRate.top2.colorOvalLeft
                  : topRate.top3.colorOvalLeft;
              let colorOvalRight =
                text === 1
                  ? topRate.top1.colorOvalRight
                  : text === 2
                  ? topRate.top2.colorOvalRight
                  : topRate.top3.colorOvalRight;
              let colorOvalBorder =
                text === 1
                  ? topRate.top1.colorBorder
                  : text === 2
                  ? topRate.top2.colorBorder
                  : topRate.top3.colorBorder;
              let colorBottom =
                text === 1
                  ? topRate.top1.colorBottom
                  : text === 2
                  ? topRate.top2.colorBottom
                  : topRate.top3.colorBottom;
              let styleObj = {
                backgroundImage: _format(
                  'linear-gradient(to bottom, {0}, {1})',
                  colorOvalLeft,
                  colorOvalRight,
                ),
                border: _format('solid 2px {0}', colorOvalBorder),
              };
              const idKey = 'top-rate-bottom' + moment().unix() + text;
              return (
                <div className="top-rate " style={styleDiv}>
                  <div className="top-rate-top" style={styleObj}>
                    <span className={styleClassName}>{text}</span>
                  </div>
                  <style
                    dangerouslySetInnerHTML={{
                      __html: [
                        '#' + idKey + ':after, #' + idKey + ':before {',
                        'border-color: ' +
                          colorBottom +
                          ' transparent transparent transparent',
                        '}',
                      ].join('\n'),
                    }}
                  />
                  <div className="top-rate-bottom" id={idKey} />
                </div>
              );
            } else {
              return (
                <div style={styleDiv} className={classDiv}>
                  <span className={styleClassName}>{iconGraph}</span>
                </div>
              );
            }
          },
        };
      }
      return result;
    });
  };

  render() {
    const {
      isLoading,
      table,
      getDataFromRedux,
      changeIdHover,
      ids,
      idHover,
      schemaKey,
      listColumn,
      isHeaderTable,
      colorLeft,
      colorRight,
      titleHeaderTable,
      isHighlight,
      handleDelete,
      handleModify,
      handleScroll,
      objectConfirmDel,
    } = this.props;
    return (
      <div>
        {isHeaderTable && (
          <HeaderTable
            title={titleHeaderTable}
            colorLeft={colorLeft || null}
            colorRight={colorRight || null}
          />
        )}
        <Table
          scrollRef={this.scrollRef}
          table={table}
          isLoading={isLoading}
          resizeable={false}
          getDataFromRedux={getDataFromRedux}
          onScrollFunction={handleScroll}
          ids={ids}
          isHighlight={isHighlight}
          schema={this.getSchema(schemaKey, listColumn)}
          changeIdHover={changeIdHover}
          idHover={idHover}
        />
      </div>
    );
  }
}

STTable.propTypes = {
  ids: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  i18nPrefix: PropTypes.string,
  // height: PropTypes.number.isRequired,
  getDataFromRedux: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  // listIndustry: PropTypes.array.isRequired,
};

STTable.defaultProps = {
  i18nPrefix: 'stRanking',
  isLoading: false,
};

const mapStateToProps = state => ({
  i18n: state.i18n,
  theme: state.theme,
});

export default connect(mapStateToProps)(STTable);
