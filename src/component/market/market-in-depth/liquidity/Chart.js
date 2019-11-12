import React from 'react';
import { fetchListData, REDUCER_NAME } from './reducer';
import { connect } from 'react-redux';
import ChartContent from './ChartContent';
import moment from 'moment';
import ConstCommon from './../../../common/Const';
import Loading from './../../../common/loading/Loading';
import { customDataChart } from './../../../helpers/Chart';
import { getUnique } from './../../../helpers/Common';
import Const from './Const';
import { ChartFooter } from './../../../common/chart/footer';
import { I18n } from 'react-redux-i18n';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyChart: getUnique(),
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchListData());
  }

  getTradingDate = tradingDate => {
    return moment(tradingDate)
      .startOf('minute')
      .format('HH:mm')
      .toString();
  };

  groupTwoData = (listIndex, listLiquidity) => {
    const result = [];
    const listIndexByTradingDate = {};

    listIndex.forEach(item => {
      const tradingDate = this.getTradingDate(item.tradingDate);
      listIndexByTradingDate[tradingDate] = item;
    });

    listLiquidity.forEach(item => {
      const tradingDate = this.getTradingDate(item.tradingDate);
      if (listIndexByTradingDate[tradingDate]) {
        const {
          indexValue,
          matchVolume,
          totalMatchValue,
          referenceIndex,
        } = listIndexByTradingDate[tradingDate];

        result.push({
          ...item,
          indexValueIndex: indexValue,
          matchVolumeIndex: matchVolume,
          totalMatchValueIndex: totalMatchValue,
          referenceIndex: referenceIndex,
        });
      } else {
        const length = result.length;
        if (length > 0) {
          const {
            indexValueIndex,
            matchVolumeIndex,
            totalMatchValueIndex,
          } = result[length - 1];

          result.push({
            ...item,
            indexValueIndex,
            matchVolumeIndex,
            totalMatchValueIndex,
          });
        }
      }
    });

    return result;
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (
      this.props.component !== nextProps.component ||
      this.props.listIndex !== nextProps.listIndex ||
      this.props.listLiquidity !== nextProps.listLiquidity
    ) {
      this.setState({ keyChart: getUnique() });
    }
  }

  getReferencePriceIndex = listIndexCustom => {
    const length = listIndexCustom.length;
    return length > 0 ? listIndexCustom[length - 1].referenceIndex : 0;
  };

  getWidthChart = () => {
    const { component } = this.props;
    const offsetWidth = 25;
    const MIN_WIDTH = 600;

    return Math.max(component.width - offsetWidth, MIN_WIDTH);
  };

  renderFooter = () => {
    const { timeRange } = this.props;
    const textI18n = `marketInDepthLiquidity.LABEL_CHART_BOTTOM_AVG.${timeRange}`;

    return (
      <ChartFooter
        list={[
          {
            text: 'marketInDepthLiquidity.LABEL_CHART_BOTTOM_TODAY',
            color: '#009cff',
            type: 'circle',
          },
          {
            text: textI18n,
            color: '#ffc859',
            type: 'circle',
          },
        ]}
      />
    );
  };

  render() {
    const { listIndex, listLiquidity, timeRange } = this.props;
    const { keyChart } = this.state;

    if (listIndex.length < 1 || listLiquidity.length < 1) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    const listIndexCustom = customDataChart(
      listIndex,
      ConstCommon.timeRange['1D'],
    );
    const listLiquidityCustom = customDataChart(
      listLiquidity,
      ConstCommon.timeRange['1D'],
    );

    const data = this.groupTwoData(listIndexCustom, listLiquidityCustom);

    return (
      <div>
        <ChartContent
          key={keyChart}
          data={data}
          width={this.getWidthChart()}
          ratio={window.devicePixelRatio}
          referencePrice={this.getReferencePriceIndex(listIndexCustom)}
          displayTimeRange={Const.displayTimeRange[timeRange]}
        />
        {this.renderFooter()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listLiquidity: state[REDUCER_NAME].listLiquidity,
    listIndex: state[REDUCER_NAME].listIndex,
    component: state[REDUCER_NAME].component,
    timeRange: state[REDUCER_NAME].timeRange,
  };
};

export default connect(mapStateToProps)(Chart);
