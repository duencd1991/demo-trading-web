import {format} from "d3-format";
import PriceCoordinate from "./lib/reference-price-line/PriceCoordinate";
import React from "react";

export default function (props) {
  return (
    <PriceCoordinate
      at="right"
      orient="right"
      price={props.price}
      stroke="#facc5c"
      dx={2}
      fill="#facc5c"
      strokeWidth={1}
      textFill="#2a2d34"
      lineStroke="#facc5c"
      lineOpacity={1}
      fontSize={12}
      snapX={false}
      displayFormat={format(".2f")}
      rectRadius={4}
      rectWidth={40}
      rectHeight={18}
    />
  )
}
