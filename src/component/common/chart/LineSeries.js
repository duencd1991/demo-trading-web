import React from 'react';
import {LineSeries} from "react-stockcharts/lib/series";

export default function (props) {
  return (
    <LineSeries
      yAccessor={props.yAccessor}
      stroke={props.stroke}/>
  );
}
