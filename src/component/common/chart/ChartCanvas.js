import ChartCanvas from "./lib/chart-canvas/ChartCanvas";
import React from "react";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { last } from "react-stockcharts/lib/utils";

export default function (props) {
  const { width, height, ratio, data: initData, type, margin } = props;

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => {
      return new Date(d.tradingDate)
    }
  );
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initData);
  const start = xAccessor(last(data));
  const end = xAccessor(data[Math.max(0, data.length - 150)]);
  const xExtents = [start, end];

  return (
    <ChartCanvas
      width={width}
      height={height}
      ratio={ratio}
      data={data}
      type={type}
      seriesName='MSFT'
      xScale={xScale}
      margin={margin}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      // mouseMoveEvent={false}
      panEvent={false}
      zoomEvent={false}
      clamp={false}
      // xExtents={xExtents}
      pointsPerPxThreshold={100}
    >
      {props.children}
    </ChartCanvas>
  )
}
