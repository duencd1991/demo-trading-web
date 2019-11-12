import React from 'react';
import './index.scss';
import Tooltip from '../../../../common/tooltip/SimpleTooltip';
import Loading from '../Loading/Loading';

class BarChartWrapper extends React.Component {
  render() {
    const {
      title = 'Chart Title',
      children,
      toolTip = 'tooltip content',
    } = this.props;
    return (
      <div className="fa-bar-chart-wrapper stock-chart">
        {/* <Loading/> */}
        <div className="chart-title">
          {title}
          <Tooltip message={toolTip} position={'right'}>
            <i style={{ opacity: 0.5 }} className="icon-info fs-10 ml-2" />
          </Tooltip>
        </div>
        <div className="chart-content">{children}</div>
        <div className="chart-legend">
          {title === 'Z-SCORE' && (
            <>
              <div className="chart-legend__item">
                <div className="square square--green" />
                <div className="title">Safe</div>
              </div>
              <div className="chart-legend__item">
                <div className="square square--yellow" />
                <div className="title">Normal</div>
              </div>
              <div className="chart-legend__item">
                <div className="square square--red" />
                <div className="title">Distress</div>
              </div>
            </>
          )}

          {title === 'M-SCORE' && (
            <>
              <div className="chart-legend__item">
                <div className="square square--green" />
                <div className="title">Not manipulator</div>
              </div>
              <div className="chart-legend__item">
                <div className="square square--red" />
                <div className="title">Manipulator</div>
              </div>
            </>
          )}

          {title === 'F-SCORE' && (
            <>
              <div className="chart-legend__item">
                <div className="square square--green" />
                <div className="title">Good</div>
              </div>
              <div className="chart-legend__item">
                <div className="square square--yellow" />
                <div className="title">Normal</div>
              </div>
              <div className="chart-legend__item">
                <div className="square square--red" />
                <div className="title">Weak</div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default BarChartWrapper;
