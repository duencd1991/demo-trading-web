import React from 'react';

import './index.scss';

class ChartWrapper extends React.Component {
  render() {
    const {
      title = 'Chart Title',
      children,
      type,
      legendProfitAbilityChart,
      height = 200,
    } = this.props;
    return (
      <div
        className="fa-chart-wrapper stock-chart"
        style={{ minHeight: height * 1.3 }}
      >
        <div className="chart-title">{title}</div>
        <div className="chart-content">{children}</div>
        <div className="chart-legend">
          {type === 'DUPONT' && (
            <>
              <div className="item">
                <div className="box bg-blue" />
                <div className="title">ROE</div>
              </div>
              <div className="item">
                <div className="line-chart img-legend-circle bg-white" />
                <div className="title">Net Profit Margin</div>
              </div>
              <div className="item">
                <div className="line-chart img-legend-square bg-cyan" />
                <div className="title">Financial Leverage</div>
              </div>
              <div className="item">
                <div className="line-chart img-legend-triangle bg-red" />
                <div className="title">Asset Turnover</div>
              </div>
            </>
          )}

          {type === 'PROFITABILITY' && (
            <>
              <div className="item mr-3">
                <div className="box bg-yellow" />
                <div className="title">
                  {legendProfitAbilityChart.stockName}
                </div>
              </div>
              <div className="item">
                <div className="box bg-green" />
                <div className="title">
                  {legendProfitAbilityChart.industryName}
                </div>
              </div>
            </>
          )}

          {type === 'ASSET QUALITY' && (
            <>
              <div className="item">
                <div className="box" style={{ backgroundColor: '#3581b8' }} />
                <div className="title">Total Asset</div>
              </div>
              <div className="item">
                <div className="box" style={{ backgroundColor: '#47ccc7' }} />
                <div className="title">Total Loan</div>
              </div>
              <div className="item">
                <div className="box" style={{ backgroundColor: '#f1ffe7' }} />
                <div className="title">Total Non-Performing Loan</div>
              </div>
              <div className="item">
                <div className="line-chart img-legend-circle bg-white" />
                <div className="title">NPL</div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default ChartWrapper;
