import React from "react";
import Left from "../../public/icons/header/Left.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  stroke?: string;
};

const LeftIcon = (props: SVGIconProps) => {
  const { width, height, fill, stroke } = props;
  return (
    <Left
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "#2B3F6C"}
      stroke={stroke ? stroke : "#2B3F6C"}
    />
  );
};

export default LeftIcon;
