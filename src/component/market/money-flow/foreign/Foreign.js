import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { compose } from 'redux';
import withMarketPreOpen from '../../../common/market-pre-open/withMarketPreOpen';
import { formatTextFloat, formatValue } from '../../../helpers/Text';
import BuySellTreeMap from '../common/buy-sell-tree-map/BuySellTreeMap';
import Tooltip from '../common/buy-sell-tree-map/Tooltip';
import { fetchForeign, REDUCER_NAME } from '../reducer';
import withRealTime from '../withRealTime';
import Filter from '../common/Filter';
import ChartWrap from './ChartWrap';
import Loading from '../../../common/loading/Loading';

const TREE_MAP_HEIGHT = 400;

const calcNet = data =>
  data.foreignBuyValueMatched - data.foreignSellValueMatched;

const renderBuyTooltip = data => (
  <Tooltip
    data={data}
    secondTitle="moneyFlowForeign.tooltipBuyTitle"
    thirdTitle="moneyFlowForeign.tooltipBuyNetTitle"
    secondValue={data.foreignBuyValueMatched}
    thirdValue={formatTextFloat(formatValue(calcNet(data)))}
  />
);

const renderSellTooltip = data => (
  <Tooltip
    data={data}
    secondTitle="moneyFlowForeign.tooltipSellTitle"
    thirdTitle="moneyFlowForeign.tooltipSellNetTitle"
    secondValue={data.foreignSellValueMatched}
    thirdValue={formatTextFloat(formatValue(calcNet(data)))}
  />
);

const Foreign = ({ foreign, isLoading }) => {
  return (
    <div className={`tab-pane active  ${isLoading ? 'bg-blur' : ''}`}>
      <Filter />
      {isLoading && <Loading />}
      <ChartWrap />
      <BuySellTreeMap
        isRealtimeTicker={true}
        sellKey="foreignSellValueMatched"
        buyKey="foreignBuyValueMatched"
        renderBuyTooltip={renderBuyTooltip}
        renderSellTooltip={renderSellTooltip}
        height={TREE_MAP_HEIGHT}
        data={foreign}
      />

      <div className="text-footer font-italic">
        <Translate value={'moneyFlowForeign.footerText'} />
      </div>
    </div>
  );
};

Foreign.propTypes = {
  fetchData: PropTypes.func.isRequired,
  foreign: PropTypes.object.isRequired,
  comGroupCode: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  foreign: state[REDUCER_NAME].foreign.data,
  isLoading: state[REDUCER_NAME].foreign.isLoading,
  comGroupCode: state[REDUCER_NAME].comGroupCode,
});

const mapDispatchToProps = {
  fetchData: fetchForeign,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withMarketPreOpen('flex-fill'),
  withRealTime,
)(Foreign);
