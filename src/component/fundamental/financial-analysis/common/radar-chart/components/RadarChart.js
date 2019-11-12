import React, { Component } from 'react';
import '../radar.scss';
import radar from './radar';
import ChartWrapper from '../../../common/chart-wrapper';

const noSmoothing = points => {
  let d = 'M' + points[0][0].toFixed(4) + ',' + points[0][1].toFixed(4);
  for (let i = 1; i < points.length; i++) {
    d += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4);
  }
  return d + 'z';
};

const setViewBox = options =>
  `-${options.captionMargin} 0 ${options.size + options.captionMargin * 2} ${
    options.size
  }`;

const defaultOptions = {
  size: 250,
  axes: true, // show axes?
  scales: 5, // show scale circles?
  captions: true, // show captions?
  dots: false, // show dots?
  zoomDistance: 1.2, // where on the axes are the captions?
  smoothing: noSmoothing, // shape smoothing function
  captionMargin: 10,
  setViewBox,
  axisProps: () => ({ className: 'axis' }),
  scaleProps: () => ({ className: 'scale', fill: 'none' }),
  shapeProps: () => ({ className: 'shape' }),
  dotProps: () => ({
    className: 'dot',
  }),
  captionProps: () => ({
    className: 'caption',
    textAnchor: 'middle',
    fontSize: 12,
    fontFamily: 'sans-serif',
  }),
};
class RadarChart extends Component {
  constructor(props) {
    super(props);
    const { toolTipContent, data } = props;
    const tooltip = data.map(item => item.name);
    this.state = {
      currentShape: null,
      x: 0,
      y: 0,
      tooltip: {
        'shape-0': toolTipContent[tooltip[0]],
        'shape-1': toolTipContent[tooltip[1]],
      },
    };
  }

  componentWillReceiveProps = ({ toolTipContent }) => {
    if (
      toolTipContent.stockTooltip !== this.props.toolTipContent.stockTooltip
    ) {
      const newTooltip = {
        'shape-0': toolTipContent.stockTooltip,
        'shape-1': toolTipContent.industryTooltip,
      };
      this.setState({ tooltip: newTooltip });
    }
  };

  handleLoad = e => {
    const doc = document.querySelector('#ta-radar-chart');
    if (doc) {
      const path = doc.querySelectorAll('path');
      for (let i = 0; i < path.length; ++i) {
        this.onoff(path[i]);
      }
    }
  };

  handleMouseMove = e => {
    if (e && 'nativeEvent' in e)
      this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  onoff = elm => {
    elm.addEventListener('mouseover', e => {
      this.setState({ currentShape: elm.id });
    });
    elm.addEventListener('mouseout', e => {
      this.setState({ currentShape: null });
    });
  };

  componentDidMount() {
    this.handleLoad();
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {}

  getTooltipContent = content => {
    const keys = Object.keys(content);
    const tooltip = keys.map((key, index) => {
      if (key === 'title')
        return (
          <div className="fs-14 fw-600" key={index}>
            {content[key]}
          </div>
        );
      return (
        <div className="d-flex" key={index}>
          <div>{`${key}:`}</div>
          <div className="fw-600" style={{ marginLeft: 4 }}>
            {content[key]}
          </div>
        </div>
      );
    });

    return tooltip;
  };

  render() {
    const {
      data,
      captions,
      options,
      size = defaultOptions.size,
      id = 'ta-radar-chart',
      title,
      type,
      legendProfitAbilityChart,
      width,
    } = this.props;
    const { x, y, currentShape, tooltip } = this.state;

    const chartOptions = {
      ...defaultOptions,
      ...options,
      size,
    };

    const { setViewBox } = chartOptions;
    const chart = radar(captions, data, chartOptions);

    return (
      <ChartWrapper
        title={title}
        type={type}
        legendProfitAbilityChart={legendProfitAbilityChart}
        height={width}
      >
        <div
          style={{ position: 'relative' }}
          onMouseMove={this.handleMouseMove}
        >
          <svg
            version="1"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox={setViewBox(chartOptions)}
            id={id}
          >
            {chart}
          </svg>
          {currentShape && (
            <div
              className="tooltip-ta d-flex flex-column"
              style={{ left: x, top: y + 40, minWidth: 150 }}
            >
              <div className="tooltip-content ">
                {this.getTooltipContent(tooltip[currentShape])}
              </div>
            </div>
          )}
        </div>
      </ChartWrapper>
    );
  }
}

export default RadarChart;
