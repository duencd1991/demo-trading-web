import React from 'react';

const polarToX = (angle, distance) => Math.cos(angle - Math.PI / 2) * distance;

const polarToY = (angle, distance) => Math.sin(angle - Math.PI / 2) * distance;

const points = points => {
  return points
    .map(point => point[0].toFixed(4) + ',' + point[1].toFixed(4))
    .join(' ');
};

const axis = options => (col, i) => (
  <polyline
    key={`poly-axis-${i}`}
    points={points([
      [0, 0],
      [
        polarToX(col.angle, options.chartSize / 2),
        polarToY(col.angle, options.chartSize / 2),
      ],
    ])}
    {...options.axisProps(col)}
  />
);

const dot = (columns, options) => (chartData, i) => {
  const data = chartData.data;
  const meta = chartData.meta || {};
  const extraProps = options.dotProps(meta);
  let mouseEnter = () => {};
  let mouseLeave = () => {};
  if (extraProps.mouseEnter) {
    mouseEnter = extraProps.mouseEnter;
  }
  if (extraProps.mouseLeave) {
    mouseLeave = extraProps.mouseLeave;
  }
  return columns.map(col => {
    const val = data[col.key];
    if ('number' !== typeof val) {
      throw new Error(`Data set ${i} is invalid.`);
    }

    return (
      <circle
        key={`dot-${col.key}-${val}`}
        cx={polarToX(col.angle, (val * options.chartSize) / 2)}
        cy={polarToY(col.angle, (val * options.chartSize) / 2)}
        className={[extraProps.className, meta.class].join(' ')}
        onMouseEnter={() => mouseEnter({ key: col.key, value: val, idx: i })}
        onMouseLeave={() => mouseLeave({})}
      />
    );
  });
};

const shape = (columns, options) => (chartData, i) => {
  const data = chartData.data;
  const meta = chartData.meta || {};
  const extraProps = options.shapeProps(meta);
  return (
    <path
      key={`shape-${i}`}
      id={`shape-${i}`}
      d={options.smoothing(
        columns.map(col => {
          const val = data[col.key];
          if ('number' !== typeof val) {
            throw new Error(`Data set ${i} is invalid.`);
          }

          return [
            polarToX(col.angle, (val * options.chartSize) / 2),
            polarToY(col.angle, (val * options.chartSize) / 2),
          ];
        }),
      )}
      {...extraProps}
      stroke={meta.color}
      fill={meta.color}
      className={[extraProps.className, meta.class].join(' ')}
    />
  );
};

const scale = (options, value, index) => {
  const { fill, ...rest } = options.scaleProps(value);
  const number = ['1', '.8', '.6', '.4', '.2'];
  return (
    <circle
      key={`circle-${value}`}
      cx={0}
      cy={0}
      fill="#555555"
      fillOpacity={number[index - 1]}
      r={(value * options.chartSize) / 2}
      {...rest}
    />
  );
};

const caption = options => col => {
  let offset = 0;
  const x = Math.round(polarToX(col.angle, options.size / 2));
  const y = Math.round(polarToY(col.angle, options.size / 2));
  if (y == 0) {
    offset = 5;
  }

  let realX = x;
  let realY = y;

  if (x === 0 || x < 0) {
    realX = x;
  } else {
    realX = x + offset;
  }

  return (
    <text
      key={`caption-of-${col.key}`}
      x={realX}
      y={realY}
      dy={(options.captionProps(col).fontSize || 10) / 2.5}
      {...options.captionProps(col)}
    >
      {col.caption}
    </text>
  );
};

const render = (captions, chartData, options = {}) => {
  if ('object' !== typeof captions || Array.isArray(captions)) {
    throw new Error('caption must be an object');
  }
  if (!Array.isArray(chartData)) {
    throw new Error('data must be an array');
  }

  const { size } = options;
  const lineX = (
    <line
      x1={0}
      y1={-size / 2}
      x2={0}
      y2={size / 2}
      style={{ stroke: 'rgba(255, 255, 255, 0.2)', strokeWidth: 0.5 }}
    />
  );
  const lineY = (
    <line
      x1={-size / 2}
      y1={0}
      x2={size / 2}
      y2={0}
      style={{ stroke: 'rgba(255, 255, 255, 0.2)', strokeWidth: 0.5 }}
    />
  );

  options.chartSize = options.size / options.zoomDistance;

  const columns = Object.keys(captions).map((key, i, all) => {
    return {
      key,
      caption: captions[key],
      angle: (Math.PI * 2 * i) / all.length,
    };
  });

  const listShape = shape(columns, options);

  const groups = [
    <g key={`g-groups}`}>
      {chartData.map(listShape)}
      {lineX}
      {lineY}
    </g>,
  ];

  if (options.captions) {
    groups.push(<g key={`poly-captions`}>{columns.map(caption(options))}</g>);
  }
  if (options.dots) {
    groups.push(<g key={`g-dots`}>{chartData.map(dot(columns, options))}</g>);
  }
  if (options.axes) {
    groups.unshift(<g key={`group-axes`}>{columns.map(axis(options))}</g>);
  }
  if (options.scales > 0) {
    const scales = [];
    for (let i = options.scales; i > 0; i--) {
      scales.push(scale(options, i / options.scales, i));
    }
    groups.unshift(<g key={`poly-scales`}>{scales}</g>);
  }
  const delta = (options.size / 2).toFixed(4);
  return <g transform={`translate(${delta},${delta})`}>{groups}</g>;
};

export default render;
