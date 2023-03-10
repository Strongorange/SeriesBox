import React from "react";
import CheckSVG from "../../public/icons/Check.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  stroke?: string;
};

const CheckIcon = (props: SVGIconProps) => {
  const { width, height, fill, stroke } = props;

  return (
    <CheckSVG
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
      stroke={stroke ? stroke : "#2B3F6C"}
    />
  );
};

export default CheckIcon;
