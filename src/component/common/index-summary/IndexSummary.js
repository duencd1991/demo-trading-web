import React, { Component } from 'react';
import OHLInfo from './OHLInfo';
import PriceInfo from './PriceInfo';
import CardInfo from './CardInfo';
import VolumeInfo from './VolumeInfo';
import Title from './Title';
import { getDataFollowKeyByDot } from '../../helpers/Common';
import Const from '../../market/market-in-depth/index2/Const';
import { getColorPrice } from '../../helpers/Color';
import {
  formatTextFloat,
  formatValueBillion,
  formatVolume,
} from '../../helpers/Text';
import { I18n } from 'react-redux-i18n';

class IndexSummary extends Component {
  renderOHL = () => {
    const { data } = this.props;

    const indexRef = getDataFollowKeyByDot(
      data,
      Const.listIgnoreColumnTable.REFERENCE_INDEX,
    );

    return (
      <OHLInfo
        list={[
          {
            label: 'O',
            className: getColorPrice(
              getDataFollowKeyByDot(
                data,
                Const.listIgnoreColumnTable.OPEN_INDEX,
              ),
              indexRef,
            ),
            value: formatTextFloat(
              getDataFollowKeyByDot(
                data,
                Const.listIgnoreColumnTable.OPEN_INDEX,
              ),
            ),
          },
          {
            label: 'H',
            className: getColorPrice(
              getDataFollowKeyByDot(
                data,
                Const.listIgnoreColumnTable.HIGHEST_INDEX,
              ),
              indexRef,
            ),
            value: formatTextFloat(
              getDataFollowKeyByDot(
                data,
                Const.listIgnoreColumnTable.HIGHEST_INDEX,
              ),
            ),
          },
          {
            label: 'L',
            className: getColorPrice(
              getDataFollowKeyByDot(
                data,
                Const.listIgnoreColumnTable.LOWEST_INDEX,
              ),
              indexRef,
            ),
            value: formatTextFloat(
              getDataFollowKeyByDot(
                data,
                Const.listIgnoreColumnTable.LOWEST_INDEX,
              ),
            ),
          },
        ]}
      />
    );
  };

  renderVolume = () => {
    const { data } = this.props;

    return (
      <VolumeInfo
        list={[
          {
            label:
              I18n.t('marketInDepthCommon.indexSummary.totalVolume') + ': ',
            value: formatTextFloat(
              formatVolume(
                getDataFollowKeyByDot(
                  data,
                  Const.listColumnTable.TOTAL_MATCH_VOLUME,
                ),
              ),
            ),
          },
          {
            label: I18n.t('marketInDepthCommon.indexSummary.totalValue') + ': ',
            value: (
              <>
                {formatTextFloat(
                  formatValueBillion(
                    getDataFollowKeyByDot(
                      data,
                      Const.listColumnTable.TOTAL_MATCH_VALUE,
                    ),
                  ),
                )}
                &nbsp;{I18n.t('marketInDepthCommon.indexSummary.bnVnd')}
              </>
            ),
          },
        ]}
      />
    );
  };

  renderCardInfo = () => {
    const { data } = this.props;

    return (
      <CardInfo
        list={[
          {
            classNameIconColor: 'text-s-color-6',
            classNameIconName: 'icon-upbi',
            value: formatTextFloat(
              getDataFollowKeyByDot(
                data,
                Const.listIgnoreColumnTable.TOTAL_STOCK_OVER_CEILING,
              ),
              0,
            ),
            label: I18n.t('marketInDepthCommon.indexSummary.ceiling'),
          },
          {
            classNameIconColor: 'text-s-color-5',
            classNameIconName: 'icon-up',
            value: formatTextFloat(
              getDataFollowKeyByDot(
                data,
                Const.listIgnoreColumnTable.TOTAL_STOCK_UP_PRICE,
              ),
              0,
            ),
            label: I18n.t('marketInDepthCommon.indexSummary.increasing'),
          },
          {
            classNameIconColor: 'text-s-color-4',
            classNameIconName: 'icon-bi',
            value: formatTextFloat(
              getDataFollowKeyByDot(
                data,
                Const.listIgnoreColumnTable.TOTAL_STOCK_NO_CHANGE_PRICE,
              ),
              0,
            ),
            label: I18n.t('marketInDepthCommon.indexSummary.standstill'),
          },
          {
            classNameIconColor: 'text-s-color-3',
            classNameIconName: 'icon-down',
            value: formatTextFloat(
              getDataFollowKeyByDot(
                data,
                Const.listIgnoreColumnTable.TOTAL_STOCK_DOWN_PRICE,
              ),
              0,
            ),
            label: I18n.t('marketInDepthCommon.indexSummary.decreasing'),
          },
          {
            classNameIconColor: 'text-s-color-2',
            classNameIconName: 'icon-downbi',
            value: formatTextFloat(
              getDataFollowKeyByDot(
                data,
                Const.listIgnoreColumnTable.TOTAL_STOCK_UNDER_FLOOR,
              ),
              0,
            ),
            label: I18n.t('marketInDepthCommon.indexSummary.floor'),
          },
        ]}
      />
    );
  };

  renderPriceInfo = () => {
    const { data } = this.props;

    const price = getDataFollowKeyByDot(
      data,
      Const.listColumnTable.INDEX_VALUE,
    );
    const referencePrice = getDataFollowKeyByDot(
      data,
      Const.listIgnoreColumnTable.REFERENCE_INDEX,
    );
    return (
      <PriceInfo
        price={formatTextFloat(price)}
        referencePrice={formatTextFloat(referencePrice)}
        change={formatTextFloat(
          getDataFollowKeyByDot(data, Const.listColumnTable.INDEX_CHANGE),
        )}
        percentChange={formatTextFloat(
          getDataFollowKeyByDot(
            data,
            Const.listColumnTable.PERCENT_INDEX_CHANGE,
          ) * 100,
        )}
        classNameColor={getColorPrice(price, referencePrice)}
      />
    );
  };

  renderTitle = () => {
    const { data } = this.props;

    return (
      <Title
        title={getDataFollowKeyByDot(
          data,
          Const.listColumnTable.COM_GROUP_CODE,
        )}
      />
    );
  };

  render() {
    return (
      <div className="left-info-widget">
        <div className="left-info-widget__metas">
          {this.renderTitle()}
          {this.renderPriceInfo()}
          {this.renderOHL()}
          {this.renderVolume()}
          {this.renderCardInfo()}
        </div>
      </div>
    );
  }
}

export default IndexSummary;
