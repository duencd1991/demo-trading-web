import React, { Component } from 'react';
import RadarChart from '../../common/radar-chart';
import Const from '../../Const';
import { formatPercent } from '../../../../helpers/Text';
class App extends Component {
  constructor(props) {
    super(props);
    this.mousePos = [0, 0];
    this.state = {
      dot: {},
    };
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = e => {
    this.mousePos = [e.pageX, e.pageY];
  };

  handleToolTip = dot => {
    this.setState({ dot });
  };

  transformPercent = (percent, key) => {
    if (isNaN(percent)) return 0;
    const MAX1 = 50;
    const MAX2 = 25;
    let returnedData = null;
    if (key == 'roe' || 'roa') {
      returnedData = percent / MAX1;
    } else {
      returnedData = percent / MAX2;
    }
    return returnedData;
  };

  render() {
    //  Color Regulation: Company (Yellow), Industry (Blue)
    //  Data Regulation: ROE, ROA: max 50%, divided into 5 equal levels (10%)
    //  NIM, YOEA: max 25%, divided in to 5 equal levels (5%)

    const {
      title,
      width,
      type,
      data: { ratios = [], ratiosIndustry = {}, isBank },
      legendProfitAbilityChart,
    } = this.props;
    const currentYear = new Date().getFullYear();
    const captions = isBank
      ? Const.profitabilityTitle.bank
      : Const.profitabilityTitle.nonBank;
    const tooltipCaption = isBank
      ? Const.profitabilityTooltip.bank
      : Const.profitabilityTooltip.nonBank;
    const keys = isBank
      ? Const.profitabilityChart.bank
      : Const.profitabilityChart.nonBank;

    const stockData = ratios.find(ratio => ratio.yearReport === currentYear);
    const industryData = ratiosIndustry;

    const stockDataTransform = {
      data: {},
      meta: { color: '#facc5c' },
    };

    const industryDataTransform = {
      data: {},
      meta: { color: '#00de8b' },
    };

    const industryTooltip = {
      title: legendProfitAbilityChart.industryName,
    };

    const stockTooltip = {
      title: legendProfitAbilityChart.stockName,
    };

    Object.keys(keys).forEach(key => {
      const tooltipTitle = tooltipCaption[key];
      if (stockData) {
        const keyValue = keys[key];
        stockDataTransform.data[key] = this.transformPercent(
          formatPercent(stockData[keyValue]),
          key,
        );
        stockTooltip[tooltipTitle] = formatPercent(stockData[keyValue]);
      }

      if (industryData) {
        const keyValue = Const.profitabilityChart.industry[key];
        industryDataTransform.data[key] = this.transformPercent(
          formatPercent(industryData[keyValue]),
          key,
        );
        industryTooltip[tooltipTitle] = formatPercent(industryData[keyValue]);
      }
    });

    const firstKeyToCompare = [Object.keys(keys)[0]];

    stockDataTransform.name = 'stockTooltip';
    industryDataTransform.name = 'industryTooltip';

    const chartData = {
      name: 'with more data',
      captions,
      options: {
        axes: false, // show axes?
        scales: 5, // how many circles?
        captions: true, // show captions?
        captionMargin: 30,
        scaleProps: () => ({
          // stroke: '#999',
          // strokeWidth: '.5'
        }),
        dotProps: () => ({
          className: 'dot',
          mouseEnter: this.handleToolTip,
          mouseLeave: this.handleToolTip,
        }),
      },
      chart: [stockDataTransform, industryDataTransform]
        .slice()
        .sort((a, b) => b.data[firstKeyToCompare] - a.data[firstKeyToCompare]),
    };

    const toolTipContent = {
      industryTooltip,
      stockTooltip,
    };

    if (ratios && Object.keys(ratios).length) {
      return (
        <>
          <RadarChart
            captions={chartData.captions}
            data={chartData.chart}
            options={chartData.options}
            size={width * 0.9}
            width={width}
            title={title}
            type={type}
            legendProfitAbilityChart={legendProfitAbilityChart}
            toolTipContent={toolTipContent}
          />
        </>
      );
    }

    return <>Loading</>;
  }
}

export default App;
