import React from "react";
import PlusSVG from "../../public/icons/bottomNav/Plus.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  stroke?: string;
};

const PlusIcon = (props: SVGIconProps) => {
  const { width, height, fill, stroke } = props;
  return (
    <PlusSVG
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
      stroke={stroke ? stroke : "#000000"}
    />
  );
};

export default PlusIcon;
