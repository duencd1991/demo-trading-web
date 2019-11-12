import React from "react";
import { timeFormat } from "d3-time-format";
import MouseCoordinateX from "./lib/mouse-coordinate-x/MouseCoordinateX";

export default function (props) {
  const strTimeFormat = props.timeFormat || "%H:%M %m/%d/%Y";
  return (
    <MouseCoordinateX
      at="bottom"
      orient="top"
      displayFormat={timeFormat(strTimeFormat)}
      fill="#ffffff"
      rectWidth={100}
      rectRadius={4}
      rectHeight={25}
      textFill="#000000"
      stroke={'#555555'}
    />
  )
}
