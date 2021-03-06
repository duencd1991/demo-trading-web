'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

exports.renderSVG = renderSVG;
exports.drawOnCanvas = drawOnCanvas;

var clock = require('../../../../../assets/images/svg/clock.svg');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('react-stockcharts/lib/utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// todo
var img = new Image();
img.src = clock;

/* eslint-disable react/prop-types */
function renderSVG(props) {
  var className = props.className;

  var edge = helper(props);
  if (edge === null) return null;
  var line = void 0,
    coordinateBase = void 0,
    coordinate = void 0;

  if ((0, _utils.isDefined)(edge.line)) {
    line = _react2.default.createElement('line', {
      className: 'react-stockcharts-cross-hair',
      strokeOpacity: edge.line.opacity,
      stroke: edge.line.stroke,
      strokeDasharray: (0, _utils.getStrokeDasharray)(
        edge.line.strokeDasharray,
      ),
      x1: edge.line.x1,
      y1: edge.line.y1,
      x2: edge.line.x2,
      y2: edge.line.y2,
    });
  }
  if ((0, _utils.isDefined)(edge.coordinateBase)) {
    var _edge$coordinateBase = edge.coordinateBase,
      rectWidth = _edge$coordinateBase.rectWidth,
      rectHeight = _edge$coordinateBase.rectHeight,
      arrowWidth = _edge$coordinateBase.arrowWidth;

    var path =
      edge.orient === 'left'
        ? 'M0,0L0,' +
          rectHeight +
          'L' +
          rectWidth +
          ',' +
          rectHeight +
          'L' +
          (rectWidth + arrowWidth) +
          ',10L' +
          rectWidth +
          ',0L0,0L0,0'
        : 'M0,' +
          arrowWidth +
          'L' +
          arrowWidth +
          ',' +
          rectHeight +
          'L' +
          (rectWidth + arrowWidth) +
          ',' +
          rectHeight +
          'L' +
          (rectWidth + arrowWidth) +
          ',0L' +
          arrowWidth +
          ',0L0,' +
          arrowWidth;

    coordinateBase =
      edge.orient === 'left' || edge.orient === 'right'
        ? _react2.default.createElement(
            'g',
            {
              key: 1,
              transform:
                'translate(' +
                edge.coordinateBase.edgeXRect +
                ',' +
                edge.coordinateBase.edgeYRect +
                ')',
            },
            _react2.default.createElement('path', {
              d: path,
              className: 'react-stockchart-text-background',
              height: rectHeight,
              width: rectWidth,
              stroke: edge.coordinateBase.stroke,
              strokeLinejoin: 'miter',
              strokeOpacity: edge.coordinateBase.strokeOpacity,
              strokeWidth: edge.coordinateBase.strokeWidth,
              fill: edge.coordinateBase.fill,
              fillOpacity: edge.coordinateBase.opacity,
            }),
          )
        : _react2.default.createElement('rect', {
            key: 1,
            className: 'react-stockchart-text-background',
            x: edge.coordinateBase.edgeXRect,
            y: edge.coordinateBase.edgeYRect,
            height: rectHeight,
            width: rectWidth,
            fill: edge.coordinateBase.fill,
            opacity: edge.coordinateBase.opacity,
          });

    coordinate = _react2.default.createElement(
      'text',
      {
        key: 2,
        x: edge.coordinate.edgeXText,
        y: edge.coordinate.edgeYText,
        textAnchor: edge.coordinate.textAnchor,
        fontFamily: edge.coordinate.fontFamily,
        fontSize: edge.coordinate.fontSize,
        dy: '.32em',
        fill: edge.coordinate.textFill,
      },
      edge.coordinate.displayCoordinate,
    );
  }
  return _react2.default.createElement(
    'g',
    { className: className },
    line,
    coordinateBase,
    coordinate,
  );
}
/* eslint-enable react/prop-types */

function helper(props) {
  var displayCoordinate = props.coordinate,
    show = props.show,
    type = props.type,
    orient = props.orient,
    edgeAt = props.edgeAt,
    hideLine = props.hideLine,
    lineStrokeDasharray = props.lineStrokeDasharray;
  var fill = props.fill,
    opacity = props.opacity,
    fontFamily = props.fontFamily,
    fontSize = props.fontSize,
    textFill = props.textFill,
    lineStroke = props.lineStroke,
    lineOpacity = props.lineOpacity;
  var stroke = props.stroke,
    strokeOpacity = props.strokeOpacity,
    strokeWidth = props.strokeWidth;
  var arrowWidth = props.arrowWidth,
    rectWidth = props.rectWidth,
    rectHeight = props.rectHeight,
    rectRadius = props.rectRadius;
  var x1 = props.x1,
    y1 = props.y1,
    x2 = props.x2,
    y2 = props.y2,
    dx = props.dx;

  if (!show) return null;

  var coordinateBase = void 0,
    coordinate = void 0;
  if ((0, _utils.isDefined)(displayCoordinate)) {
    var textAnchor = 'middle'; // TODO: Below it is necessary to implement logic for the possibility of alignment from the right or from the left.

    var edgeXRect = void 0,
      edgeYRect = void 0,
      edgeXText = void 0,
      edgeYText = void 0;

    if (type === 'horizontal') {
      edgeXRect =
        dx + (orient === 'right' ? edgeAt + 1 : edgeAt - rectWidth - 1);
      edgeYRect = y1 - rectHeight / 2 - strokeWidth;
      edgeXText =
        dx +
        (orient === 'right' ? edgeAt + rectWidth / 2 : edgeAt - rectWidth / 2);
      edgeYText = y1;
    } else {
      var dy = orient === 'bottom' ? strokeWidth - 1 : -strokeWidth + 1;
      edgeXRect = x1 - rectWidth / 2;
      edgeYRect = (orient === 'bottom' ? edgeAt : edgeAt - rectHeight) + dy;
      edgeXText = x1;
      edgeYText =
        (orient === 'bottom'
          ? edgeAt + rectHeight / 2
          : edgeAt - rectHeight / 2) + dy;
    }

    coordinateBase = {
      edgeXRect: edgeXRect,
      edgeYRect: edgeYRect,
      rectHeight: rectHeight + strokeWidth,
      rectWidth: rectWidth,
      rectRadius: rectRadius,
      fill: fill,
      opacity: opacity,
      arrowWidth: arrowWidth,
      stroke: stroke,
      strokeOpacity: strokeOpacity,
      strokeWidth: strokeWidth,
    };
    coordinate = {
      edgeXText: edgeXText,
      edgeYText: edgeYText,
      textAnchor: textAnchor,
      fontFamily: fontFamily,
      fontSize: fontSize,
      textFill: textFill,
      displayCoordinate: displayCoordinate,
    };
  }

  var line = hideLine
    ? undefined
    : {
        opacity: lineOpacity,
        stroke: lineStroke,
        strokeDasharray: lineStrokeDasharray,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
      };

  return {
    coordinateBase: coordinateBase,
    coordinate: coordinate,
    line: line,
    orient: orient,
  };
}

function drawOnCanvas(ctx, props) {
  var fontSize = props.fontSize,
    fontFamily = props.fontFamily;

  ctx.font = fontSize + 'px ' + fontFamily;
  ctx.textBaseline = 'middle';
  // todo: increase width with clock
  // var width = Math.round(ctx.measureText(props.coordinate).width + 10);
  var width = Math.round(ctx.measureText(props.coordinate).width + 10) + 15;
  // todo: end increase width with clock

  var edge = helper(_extends({}, props, { rectWidth: width }));

  if (edge === null) return;

  if ((0, _utils.isDefined)(edge.line)) {
    var dashArray = (0, _utils.getStrokeDasharray)(edge.line.strokeDasharray)
      .split(',')
      .map(function(d) {
        return +d;
      });
    ctx.setLineDash(dashArray);
    ctx.strokeStyle = (0, _utils.hexToRGBA)(
      edge.line.stroke,
      edge.line.opacity,
    );
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(edge.line.x1, edge.line.y1);
    ctx.lineTo(edge.line.x2, edge.line.y2);
    ctx.stroke();
  }

  ctx.setLineDash([]);
  if ((0, _utils.isDefined)(edge.coordinateBase)) {
    var _edge$coordinateBase2 = edge.coordinateBase,
      rectWidth = _edge$coordinateBase2.rectWidth,
      rectHeight = _edge$coordinateBase2.rectHeight,
      rectRadius = _edge$coordinateBase2.rectRadius,
      arrowWidth = _edge$coordinateBase2.arrowWidth;

    ctx.fillStyle = (0, _utils.hexToRGBA)(
      edge.coordinateBase.fill,
      edge.coordinateBase.opacity,
    );
    if ((0, _utils.isDefined)(edge.coordinateBase.stroke)) {
      ctx.strokeStyle = (0, _utils.hexToRGBA)(
        edge.coordinateBase.stroke,
        edge.coordinateBase.strokeOpacity,
      );
      ctx.lineWidth = edge.coordinateBase.strokeWidth;
    }

    var x = edge.coordinateBase.edgeXRect;
    var y = edge.coordinateBase.edgeYRect;
    var halfHeight = rectHeight / 2;

    // todo: change position Bg
    const { chartWidth } = props;
    x = getPositionBg(x, chartWidth, rectWidth).x;

    ctx.beginPath();
    if (edge.orient === 'right') {
      x -= arrowWidth;
      ctx.moveTo(x, y + halfHeight);
      ctx.lineTo(x + arrowWidth, y);
      ctx.lineTo(x + rectWidth + arrowWidth, y);
      ctx.lineTo(x + rectWidth + arrowWidth, y + rectHeight);
      ctx.lineTo(x + arrowWidth, y + rectHeight);
      ctx.closePath();
    } else if (edge.orient === 'left') {
      // x += arrowWidth;
      ctx.moveTo(x, y);
      ctx.lineTo(x + rectWidth, y);
      ctx.lineTo(x + rectWidth + arrowWidth, y + halfHeight);
      ctx.lineTo(x + rectWidth, y + rectHeight);
      ctx.lineTo(x, y + rectHeight);
      ctx.closePath();
    } else {
      if (rectRadius) {
        /* ========== CUSTOM CODE START========= */
        // draw round corner rect with triangle
        const centerX = props.x1; // x where triangle point to
        roundRectWithTriangle(
          ctx,
          x,
          y - 5,
          rectWidth,
          rectHeight,
          rectRadius,
          chartWidth,
          centerX,
        );
        /* ========== CUSTOM CODE END ========== */
      } else {
        ctx.rect(x, y, rectWidth, rectHeight);
      }
    }
    ctx.fill();

    if ((0, _utils.isDefined)(edge.coordinateBase.stroke)) {
      ctx.stroke();
    }

    ctx.fillStyle = edge.coordinate.textFill;
    ctx.textAlign =
      edge.coordinate.textAnchor === 'middle'
        ? 'center'
        : edge.coordinate.textAnchor;
    // todo: change position X text
    ctx.textBaseline = 'alphabetic';
    const margin = 5;
    const iconTime = { width: 10 };
    // ctx.fillText(edge.coordinate.displayCoordinate, edge.coordinate.edgeXText, edge.coordinate.edgeYText);
    // todo: draw icon clock
    const xIconTime = x + margin;
    ctx.drawImage(
      img,
      xIconTime,
      edge.coordinate.edgeYText - 10,
      iconTime.width,
      iconTime.width,
    );
    // todo: end draw icon clock

    const listDateTime = edge.coordinate.displayCoordinate.split(' ');
    if (listDateTime.length === 2) {
      const time = listDateTime[0];
      const date = listDateTime[1];
      ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
      const xTime =
        xIconTime +
        iconTime.width +
        getStartPositionByTextAlign(time, ctx).width +
        margin;
      ctx.fillText(time, xTime, edge.coordinate.edgeYText);

      ctx.font = fontSize + 'px ' + fontFamily;
      const xDate =
        xTime +
        getStartPositionByTextAlign(time, ctx).width +
        getStartPositionByTextAlign(date, ctx).width +
        margin;
      ctx.fillText(date, xDate, edge.coordinate.edgeYText);
    } else {
      ctx.fillText(
        edge.coordinate.displayCoordinate,
        xIconTime +
          iconTime.width +
          getStartPositionByTextAlign(edge.coordinate.displayCoordinate, ctx)
            .width +
          margin,
        edge.coordinate.edgeYText,
      );
    }
    // todo: end change position X text
  }
}

function getStartPositionByTextAlign(text, ctx) {
  switch (ctx.textAlign) {
    case 'center':
      return { width: ctx.measureText(text).width / 2 };
    case 'left':
      return { width: 0 };
    case 'right':
      return { width: ctx.measureText(text).width };
    default:
      return { width: 0 };
  }
}

function roundRectWithTriangle(ctx, x, y, w, h, r, chartWidth, centerX) {
  const triangleSize = 4;
  const borderWidth = 0.5;
  ctx.strokeStyle = '#555555';
  ctx.lineWidth = borderWidth;

  const { triangleBottomX, triangleBottomY } = getPositionTriangleBottom(
    x,
    w,
    h,
    triangleSize,
    r,
    chartWidth,
    centerX,
  );

  ctx.translate(x, y);

  ctx.beginPath();
  ctx.moveTo(r, 0); //start point
  ctx.lineTo(w - r, 0); // top border
  ctx.quadraticCurveTo(w, 0, w, r); // top right corner
  ctx.lineTo(w, h - r); // right border

  // bottom right corner
  if (w - triangleBottomX > r + triangleSize / 2) {
    ctx.quadraticCurveTo(w, h, w - r, h);
    ctx.lineTo(triangleBottomX + triangleSize / 2, triangleBottomY);
  } else {
    ctx.quadraticCurveTo(w, h, triangleBottomX, h);
  }

  ctx.lineTo(triangleBottomX, triangleBottomY + triangleSize); // triangle

  // bottom left corner
  if (triangleBottomX > r + triangleSize / 2) {
    ctx.lineTo(triangleBottomX - triangleSize / 2, triangleBottomY);
    ctx.lineTo(r, h);
  } else {
    ctx.lineTo(triangleBottomX, triangleBottomY);
  }

  ctx.quadraticCurveTo(0, h, 0, h - r); // bottom left corner
  ctx.lineTo(0, r); // left border
  ctx.quadraticCurveTo(0, 0, r, 0); // top left corner

  ctx.closePath();

  ctx.translate(-x, -y);
}

// todo
function getPositionTriangleBottom(x, w, h, triangleSize, r, width, centerX) {
  let triangleBottomX = w;
  let triangleBottomY = h;

  if (x === 0 && w > centerX) {
    // left
    triangleBottomX = centerX;
  } else if (x === width - w && w > width - centerX) {
    // right
    triangleBottomX = w - (width - centerX);
  } else {
    // normal case
    triangleBottomX = w / 2;
  }
  return {
    triangleBottomX,
    triangleBottomY,
  };
}

// todo
function getPositionBg(x, chartWidth, rectWidth) {
  if (x < 0) {
    x = 0;
  } else if (x > chartWidth - rectWidth) {
    x = chartWidth - rectWidth;
  }
  return { x };
}

// export default EdgeCoordinate;

