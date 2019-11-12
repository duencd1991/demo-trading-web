import {BarSeries} from "react-stockcharts/lib/series";
import React from "react";

export default function (props) {
  const { theme } = props;
  const barColor = (theme==='dark') ? "#376691" : "#2c73e8";
  return (
    <BarSeries
      yAccessor={props.yAccessor}
      opacity={1}
      widthRatio={1}
      fill={barColor}
    />
  )
}
