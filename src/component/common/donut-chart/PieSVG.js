import React from 'react';
import * as d3 from 'd3';
import Arc from './Arc';
import Legends from './Legends';

class PieSVG extends React.Component {
  render() {
    const {
      data,
      colors,
      width,
      height,
      innerRadius,
      outerRadius,
      tooltipPaddingX,
      tooltipPaddingY,
      renderTooltip,
    } = this.props;
    const createPie = d3
      .pie()
      .value(d => d.item2)
      .sort(null);
    const createArc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
    const format = d3.format('.2f');
    const dataPie = createPie(data);
    const idTooltip = `a${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    return (
      <div className="wrap-box-inside">
        <div className="chart" ref={this.cache}>
          <svg width={width} height={height}>
            <g transform={`translate(${outerRadius} ${outerRadius})`}>
              {dataPie.map((d, i) => (
                <Arc
                  key={i}
                  data={d}
                  index={i}
                  createArc={createArc}
                  renderTooltip={renderTooltip}
                  colors={colors}
                  format={format}
                  idTooltip={idTooltip}
                  tooltipPaddingX={tooltipPaddingX}
                  tooltipPaddingY={tooltipPaddingY}
                />
              ))}
            </g>
          </svg>
        </div>
        <div
          className="donut-chart-legend-wrapper"
          style={{
            marginTop: 10,
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginLeft: 5,
          }}
        >
          {dataPie.map((d, i) => (
            <Legends key={i} data={d} colors={colors} />
          ))}
        </div>
        <div id={`${idTooltip}`} className="div-wrap-tooltip">
          <div id="value" />
        </div>
      </div>
    );
  }
}

export default PieSVG;
