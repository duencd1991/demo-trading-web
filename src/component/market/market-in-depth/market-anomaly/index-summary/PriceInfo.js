import React from 'react';
import { formatTextFloat, val, formatPrice } from '../../../../helpers/Text';
import { getDataFollowKeyByDot } from '../../../../helpers/Common';
import Const from '../Const';
import { connect } from 'react-redux';
import { REDUCER_NAME } from '../reducer';
import { getColorRedGreen } from './../../../../helpers/Color';

const mapStateToProps = state => {
  return {
    indexData: state[REDUCER_NAME].indexData,
    listDataSearch: state[REDUCER_NAME].listDataSearch,
  };
};

export default connect(mapStateToProps)(PriceInfo);

const getValue = (indexData, organCodeOfTicker) => {
  let value = getDataFollowKeyByDot(indexData, Const.indexData.VALUE);
  if (organCodeOfTicker.isTicker) {
    value = formatPrice(value);
  }
  return formatTextFloat(value).split('.');
};

const getChange = (indexData, organCodeOfTicker) => {
  return organCodeOfTicker.isTicker
    ? val(
        formatTextFloat(
          formatPrice(
            getDataFollowKeyByDot(indexData, Const.indexData.VALUE_CHANGE),
          ),
        ),
      )
    : val(
        formatTextFloat(
          getDataFollowKeyByDot(indexData, Const.indexData.VALUE_CHANGE),
        ),
      );
};

function PriceInfo(props) {
  const { indexData, listDataSearch } = props;
  let organCodeOfTicker = {};
  let [valueBeforeDot, valueAfterDot] = [];

  if (
    Object.keys(indexData).length > 0 &&
    Object.keys(listDataSearch).length > 0
  ) {
    organCodeOfTicker = listDataSearch.find(
      item => item.organCode === indexData.anomalyItems[0].code,
    );
    [valueBeforeDot, valueAfterDot] = getValue(indexData, organCodeOfTicker);
  }

  const className = getColorRedGreen(
    getDataFollowKeyByDot(indexData, Const.indexData.VALUE_CHANGE),
  );
  const iconClassName =
    getDataFollowKeyByDot(indexData, Const.indexData.VALUE_CHANGE) >= 0
      ? 'icon-caret-up fs-10 text-s-color-5'
      : 'icon-caret fs-10 text-s-color-3';
  return (
    <div className="left-info-widget__metas">
      <div className="item-first">
        <strong className={className}>{val(valueBeforeDot)}</strong>
        <span>
          <small className={className}>.{val(valueAfterDot)}</small>
          <small>VND</small>
        </span>
        <span>
          <small className={className}>
            {getChange(indexData, organCodeOfTicker)}
          </small>
          <small>
            <i className={iconClassName} />
            &nbsp;
            {val(
              formatTextFloat(
                getDataFollowKeyByDot(
                  indexData,
                  Const.indexData.PERCENT_VALUE_CHANGE,
                ) * 100,
              ),
            )}
            &nbsp;%
          </small>
        </span>
      </div>
    </div>
  );
}
