import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { formatTextFloat, formatVolume } from '../../../helpers/Text';
import BuySellTreeMap from '../common/buy-sell-tree-map/BuySellTreeMap';
import Tooltip from '../common/buy-sell-tree-map/Tooltip';
import Filter from '../common/Filter';
import { fetchProprietary, REDUCER_NAME } from '../reducer';
import withRealTime from '../withRealTime';

const renderBuyTooltip = data => (
  <Tooltip
    data={data}
    secondTitle="moneyFlowProprietary.tooltipBuyTitle"
    secondValue={data.totalBuyTradeValue}
    thirdTitle="moneyFlowProprietary.tooltipBuyNetTitle"
    thirdValue={formatTextFloat(formatVolume(data.totalBuyTradeVolume))}
  />
);

const renderSellTooltip = data => (
  <Tooltip
    data={data}
    secondTitle="moneyFlowProprietary.tooltipSellTitle"
    thirdTitle="moneyFlowProprietary.tooltipSellNetTitle"
    secondValue={data.totalSellTradeValue}
    thirdValue={formatTextFloat(formatVolume(data.totalSellTradeVolume))}
  />
);

const Proprietary = ({ proprietary, isLoading }) => (
  <div className="tab-pane active d-flex flex-column">
    <div className="mb-20 ">
      <Filter tab="Proprietary" />
    </div>

    <BuySellTreeMap
      renderBuyTooltip={renderBuyTooltip}
      renderSellTooltip={renderSellTooltip}
      isLoading={isLoading}
      data={proprietary}
    />

    <div className="text-footer font-italic">
      <Translate value={'moneyFlowProprietary.footerText'} />
    </div>
  </div>
);

Proprietary.propTypes = {
  proprietary: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  comGroupCode: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  proprietary: state[REDUCER_NAME].proprietary.data,
  isLoading: state[REDUCER_NAME].proprietary.isLoading,
  comGroupCode: state[REDUCER_NAME].comGroupCode,
});

const mapDispatchToProps = {
  fetchData: fetchProprietary,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRealTime(Proprietary));
