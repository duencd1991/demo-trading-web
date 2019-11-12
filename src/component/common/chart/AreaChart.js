import { AreaSeries } from 'react-stockcharts/lib/series';
import React from 'react';
import {
  createVerticalLinearGradient,
  hexToRGBA,
} from 'react-stockcharts/lib/utils';

export default function(props) {
  const { theme } = props;

  const canvasGradientDark = createVerticalLinearGradient([
    { stop: 0, color: hexToRGBA('#1a76cf', 0.5) },
    { stop: 1, color: hexToRGBA('#020203', 0.5) },
  ]);

  const canvasGradientLight = createVerticalLinearGradient([
    { stop: 0, color: hexToRGBA('#5dc5f6', 1) },
    { stop: 1, color: hexToRGBA('#5568de', 1) },
  ]);

  const canvasGradient =
    theme === 'dark' ? canvasGradientDark : canvasGradientLight;
  const strokeColor = theme === 'dark' ? '#9adbff' : '#0060ff';

  return (
    <AreaSeries
      stroke={strokeColor}
      yAccessor={props.yAccessor}
      strokeWidth={1}
      canvasGradient={canvasGradient}
    />
  );
}
