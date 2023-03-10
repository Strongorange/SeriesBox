import React from "react";
import CancelSVG from "../../public/icons/Cancel.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  stroke?: string;
};

const CancelIcon = (props: SVGIconProps) => {
  const { width, height, fill, stroke } = props;

  return (
    <CancelSVG
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
      stroke={stroke ? stroke : "#2B3F6C"}
    />
  );
};

export default CancelIcon;
