import React from 'react';
import Const from './Const';
import moment from 'moment';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import {
  formatPercent,
  formatPrice,
  formatTextFloat,
  formatValue,
  formatValueBillion,
} from '../../helpers/Text';

const textNull = '--';

function calculateDayRangeChart(lowestPrice, highestPrice, matchPrice) {
  let $highestPrice = Math.max(highestPrice, lowestPrice);
  let $lowestPrice = Math.min(highestPrice, lowestPrice);

  if ($lowestPrice >= matchPrice) {
    return 0;
  }
  if ($highestPrice <= matchPrice) {
    return 100;
  }
  return (100 * (matchPrice - $lowestPrice)) / ($highestPrice - $lowestPrice);
}

class InForItem extends React.PureComponent {
  render() {
    const { data, listItem, priceData } = this.props;
    const getDataValue = (item, dataSummary) => {
      if (dataSummary) {
        const key = item.key;
        let dataValue = dataSummary[key];
        if (dataValue) {
          switch (item.type) {
            case Const.SETTINGS.formatBillion:
              dataValue = formatTextFloat(formatValueBillion(dataValue));
              break;
            case Const.SETTINGS.formatMilliion:
              dataValue = formatTextFloat(formatValue(dataValue));
              break;
            case Const.SETTINGS.formatTextFloat:
              dataValue = formatTextFloat(dataValue);
              break;
            case Const.SETTINGS.formatTextFloat0:
              dataValue = formatTextFloat(dataValue, 0);
              break;
            case Const.SETTINGS.formatPercent:
              dataValue = formatTextFloat(formatPercent(dataValue));
              break;
            default:
              break;
          }
        }
        return dataValue;
      }
      return textNull;
    };
    return (
      <>
        {data.map((dataItem, index) => {
          const dataSummary = dataItem.summary;
          const idKeyParent = 'idKeyParent' + moment().unix() + index;
          return (
            <div className="snapShotTable-col h-100" key={idKeyParent}>
              {listItem.map((item, index2) => {
                const idKeyChild = 'idKeyChild' + moment().unix() + index2;
                const itemName = I18n.t(item.name);
                if (item.isYRange) {
                  return (
                    <div className="snapShotTable-row" key={idKeyChild}>
                      <span>{itemName}</span>
                      <div className="snapShotTable-item-end  snapShotTable-item-end-yRange">
                        <span
                          className="snapShot-infor-yRange"
                          style={{ float: 'left' }}
                        >
                          {dataSummary != null
                            ? formatTextFloat(
                                formatPrice(dataSummary[item.key]),
                              )
                            : textNull}
                        </span>
                        <small
                          className="range-line"
                          style={{
                            left:
                              calculateDayRangeChart(
                                dataSummary[item.key],
                                dataSummary[item.key2],
                                priceData.MatchPrice,
                              ) + '%',
                          }}
                        />
                        <span
                          className="snapShot-infor-yRange"
                          style={{ float: 'right' }}
                        >
                          {dataSummary != null
                            ? formatTextFloat(
                                formatPrice(dataSummary[item.key2]),
                              )
                            : textNull}
                        </span>
                      </div>
                    </div>
                  );
                } else {
                  let dataValue = getDataValue(item, dataSummary);
                  return (
                    <div className="snapShotTable-row" key={idKeyChild}>
                      <span>{itemName}</span>
                      <div className="snapShotTable-item-end">
                        <span>{dataValue}</span>
                        <span>{I18n.t(item.unit)}</span>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </>
    );
  }
}
const mapStateToProps = state => ({
  theme: state.theme,
  i18n: state.i18n,
});

export default connect(mapStateToProps)(InForItem);
