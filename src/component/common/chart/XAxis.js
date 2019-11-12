import React from 'react';
import { XAxis } from 'react-stockcharts/lib/axes';
import moment from 'moment';

let prevTime = '';

export default function(props) {
  const { theme } = props;
  const strokeColor = theme === 'dark' ? '#003b63' : '#2b457d';
  return (
    <XAxis
      axisAt="bottom"
      orient="top"
      tickStroke="#d2d3d4"
      stroke={strokeColor}
      tickPadding={0}
      strokeWidth={30}
      innerTickSize={0}
      outerTickSize={15}
      fontSize={9}
      edgeClip={true}
      tickSize={2}
      tickValues={props.tickValues}
      zoomEnabled={false}
      tickFormat={d => {
        const tradingDate = moment(props.data[d].tradingDate);
        const result = tradingDate.format(props.format).toString();
        if (result !== prevTime) {
          prevTime = result;
          return result;
        }
      }}
    />
  );
}
