import React from "react";
import LoadingSVG from "../../public/icons/Swap.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  stroke?: string;
};

const LoadingIcon = (props: SVGIconProps) => {
  const { width, height, fill, stroke } = props;
  return (
    <LoadingSVG
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
      stroke={stroke ? stroke : "none"}
    />
  );
};

export default LoadingIcon;
