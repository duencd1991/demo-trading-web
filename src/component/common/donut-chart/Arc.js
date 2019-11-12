import React from 'react';
import * as d3 from 'd3';
import { clientPoint } from 'd3-selection';
import { formatTextFloat, formatPercent } from './../../helpers/Text';

class Arc extends React.Component {
  constructor(props) {
    super(props);
    this.arc = props.createArc;
  }

  componentDidMount() {
    d3.select(this.refs.arc)
      .datum(this.props.data)
      .attr('d', null)
      .transition()
      .delay(() => {
        return this.props.index * 20;
      })
      .duration(500)
      .attrTween('d', d => {
        var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return t => {
          d.endAngle = i(t);
          return this.arc(d);
        };
      });
  }

  componentWillReceiveProps(nextProps) {
    this.arc(nextProps.createArc);

    d3.select(this.refs.arc)
      .datum(nextProps.data)
      .attr('d', null)
      .transition()
      .delay(() => {
        return nextProps.index * 20;
      })
      .duration(500)
      .attrTween('d', d => {
        var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return t => {
          d.endAngle = i(t);
          return this.arc(d);
        };
      });
  }

  getTooltip = data => {
    const { renderTooltip } = this.props;
    if (renderTooltip && typeof renderTooltip === 'function') {
      return renderTooltip(data.data.item2);
    }

    return `${formatPercent(formatTextFloat(data.data.item2))} %`;
  };

  render() {
    const {
      data,
      index,
      colors,
      idTooltip,
      tooltipPaddingX,
      tooltipPaddingY,
    } = this.props;
    const arc = this.arc(data);
    return (
      <g key={index} className="arc" id="donut">
        <path
          ref="arc"
          d={arc}
          fill={colors[index]}
          onMouseMove={e => {
            /*      .html(`<div class="tooltip-custom"><div class="color-wrapper" style="background-color : ${colors[index]}"></div>
                      <div style="white-space: nowrap"> ${data.data.item1} ${formatPercent(data.data.item2)} %</div></div>`);  */

            d3
              .select(`#${idTooltip}`)
              .style(
                'left',
                clientPoint(e.target, e)[0] + tooltipPaddingX + 'px',
              )
              .style(
                'bottom',
                -clientPoint(e.target, e)[1] + tooltipPaddingY + 'px',
              )
              .style('display', 'inline-table')
              .select('#value')
              .html(`<div class="tooltip-custom"><span class="color-wrapper" style="background-color : ${
              colors[index]
            }">
                        </span>
                        <div>
                          ${data.data.item1}
                          <a style="font-weight: bold">
                            ${this.getTooltip(data)}
                          </a>
                        </div>
                      </div>`);
          }}
          onMouseOut={() => {
            d3.select(`#${idTooltip}`).style('display', 'none');
          }}
        />
      </g>
    );
  }
}

export default Arc;
