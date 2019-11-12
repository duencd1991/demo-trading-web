const SETTINGS = {
  HEIGHT: 400,
  MARGIN: { left: 80, right: 80, top: 0, bottom: 30 },
  TEXT_COLOR: '#ffffff80',
  TEXT_COLOR_LIGHT: '#1f202399',
  TEXT_SM_SIZE: 10,
  TEXT_MD_SIZE: 12,
  TEXT_LG_SIZE: 14,
  BIG_SIZE: 20,
  CHART_INDEX: {
    COLOR: '#47c3ff',
    HEIGHT: 300,
  },
  CHART_RATE: {
    COLOR: '#facc5c',
    HEIGHT: 300,
  },
  COLORS: {
    white: '#ffffff',
    dark: '#1e242e',
    black: '#000000',
    tickStrokeColor: '#555555',
  },
  LEFT: 'left',
  BOTTOM: 'bottom',
};
const hoverTooltip = {
  fillLight: SETTINGS.COLORS.white,
  fill: SETTINGS.COLORS.white,
  stroke: SETTINGS.COLORS.white,
  strokeLight: SETTINGS.COLORS.dark,
};
const YAxis = {
  yaxisAt: SETTINGS.LEFT,
  yorient: SETTINGS.LEFT,
  tickInterval: 5,
  ticks: 6,
  innerTickSize: 0,
  tickStroke: SETTINGS.COLORS.tickStrokeColor,
  tickStrokeLight: SETTINGS.COLORS.tickStrokeColor,
  tickStrokeLabelAxis: SETTINGS.COLORS.white,
  tickStrokeLabelAxisLight: SETTINGS.COLORS.black,
  tickStrokeOpacity: 1,
  stroke: SETTINGS.COLORS.dark,
  strokeLight: SETTINGS.COLORS.white,
  yGrid: {},
  fontSize: SETTINGS.TEXT_SM_SIZE,
  title: {
    x: 0,
    y: 0,
    rotate: -90,
    fill: SETTINGS.COLORS.white,
    fillLight: SETTINGS.COLORS.black,
    fontSize: SETTINGS.TEXT_SM_SIZE,
    text: '',
    opacity: 0.6,
  },
};
const LineSeries = 'LineSeries';
const BarSeries = 'BarSeries';
const titleChart = {
  title: '',
  fontSize: SETTINGS.TEXT_MD_SIZE,
  x: -10,
  y: -10,
  fill: SETTINGS.COLORS.white,
};
const serie = {
  strokeDasharray: 'Solid',
  opacity: 1,
  strokeWidth: 1,
  highlightOnHover: false,
};

const XAxis = {
  axisAt: SETTINGS.BOTTOM,
  orient: SETTINGS.BOTTOM,
  tickStroke: SETTINGS.TEXT_COLOR,
  tickStrokeLight: SETTINGS.TEXT_COLOR_LIGHT,
  stroke: SETTINGS.TEXT_COLOR,
  strokeLight: SETTINGS.TEXT_COLOR_LIGHT,
  innerTickSize: 0,
  fontSize: SETTINGS.TEXT_SM_SIZE,
  zoomEnabled: false,
  opacity: 0.5,
  tickStrokeOpacity: 0.5,
  ticks: 7,
};
const configChartFunc = (
  xAccessor,
  xExtents,
  margin,
  height,
  listLegend,
  titleChart,
  charts,
  isSynchronizingTooltip,
  eventSynchTooltipName,
) => {
  let objConfig = {
    xAccessor: xAccessor,
    xExtents: xExtents,
    charts: charts,
  };
  objConfig = addPropertiesObject(
    objConfig,
    'isSynchronizingTooltip',
    isSynchronizingTooltip,
  );
  objConfig = addPropertiesObject(
    objConfig,
    'eventSynchTooltipName',
    eventSynchTooltipName,
  );
  objConfig = addPropertiesObject(objConfig, 'listLegend', listLegend);
  objConfig = addPropertiesObject(objConfig, 'titleChart', titleChart);
  objConfig = addPropertiesObject(objConfig, 'margin', margin);
  objConfig = addPropertiesObject(objConfig, 'height', height);
  return objConfig;
};

const hoverTooltipFunc = (bgOpacity, fillColor, opacity, contents) => {
  let objConfig = {
    bgOpacity: bgOpacity || 0.1,
    fill: fillColor || hoverTooltip.fill,
    stroke: fillColor || hoverTooltip.stroke,
    opacity: opacity || 1,
    contents: contents,
  };
  return objConfig;
};
const setConfigYAxis = (yaxisAt, yorient, yGrid, title) => {
  let objConfig = {
    yaxisAt: yaxisAt,
    yorient: yorient,
  };
  objConfig = addPropertiesObject(objConfig, 'yGrid', yGrid);
  objConfig = addPropertiesObject(objConfig, 'title', title);
  return objConfig;
};
const setConfigChartItem = (
  HoverTooltip,
  yExtentsKeys,
  YAxis,
  XAxis,
  series,
  isStackedBar,
) => {
  let objConfig = {
    yExtentsKeys: yExtentsKeys,
    YAxis: YAxis,
    series: series,
  };
  objConfig = addPropertiesObject(objConfig, 'HoverTooltip', HoverTooltip);
  objConfig = addPropertiesObject(objConfig, 'isStackedBar', isStackedBar);
  objConfig = addPropertiesObject(objConfig, 'XAxis', XAxis);
  return objConfig;
};
const setConfigBarSeries = (
  yAccessor,
  stroke,
  fill,
  fillHover = null,
  fillHoverLight = null,
  highlightOnHover = false,
) => {
  let objConfig = {
    type: BarSeries,
    yAccessor: yAccessor,
    stroke: stroke,
    fill: fill,
    highlightOnHover: highlightOnHover,
  };

  objConfig = addPropertiesObject(objConfig, 'fillHover', fillHover);
  objConfig = addPropertiesObject(objConfig, 'fillHoverLight', fillHoverLight);
  return objConfig;
};
const setConfigLineSeries = (
  yAccessor,
  stroke,
  markerType,
  markerProps,
  strokeWidth,
  strokeLight = null,
  highlightOnHover = false,
) => {
  let objConfig = {
    type: LineSeries,
    yAccessor: yAccessor,
    stroke: stroke,
    markerType: markerType,
    highlightOnHover: highlightOnHover,
  };
  objConfig = addPropertiesObject(objConfig, 'markerProps', markerProps);
  objConfig = addPropertiesObject(objConfig, 'markerProps', markerProps);
  objConfig = addPropertiesObject(objConfig, 'strokeLight', strokeLight);
  return objConfig;
};
const setContentTooltip = (
  label,
  keyLabel,
  value,
  stroke,
  isContent2 = false,
) => {
  let objConfig = {
    label: label,
    keyLabel: keyLabel,
    value: value,
    stroke: stroke,
    isContent2: isContent2,
  };
  return objConfig;
};
const setLegendConfig = (type, name, color, colorLight) => {
  let objConfig = {
    type: type,
    name: name,
    color: color,
  };
  objConfig = addPropertiesObject(objConfig, 'colorLight', colorLight);
  return objConfig;
};
const addPropertiesObject = (obj, nameProperties, value) => {
  if (value) {
    obj[nameProperties] = value;
  }
  return obj;
};

const getTickValue = (arr, key) => {};

export default {
  YAxis,
  XAxis,
  SETTINGS,
  serie,
  titleChart,
  BARCHART: 'BARCHART',
  STACKCHART: 'STACKCHART',
  CIRCLEMARKERLINE: 'CIRCLEMARKERLINE',
  TRIANGLEMARKERLINE: 'TRIANGLEMARKERLINE',
  SQUAREMARKERLINE: 'SQUAREMARKERLINE',
  GROUPCHART: 'GROUPCHART',
  StackedBarSeries: 'StackedBarSeries',
  Line: 'Line',
  LineSeries,
  BarSeries,
  CircleMarker: 'CircleMarker',
  TriangleMarker: 'TriangleMarker',
  SquareMarker: 'SquareMarker',
  configChartFunc,
  hoverTooltipFunc,
  setConfigYAxis,
  setConfigChartItem,
  setConfigBarSeries,
  setContentTooltip,
  setConfigLineSeries,
  setLegendConfig,
  hoverTooltip,
};
