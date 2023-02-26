import React from "react";
import DangerSVG from "../../public/icons/Danger.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  stroke?: string;
};

const DangerIcon = (props: SVGIconProps) => {
  const { width, height, fill, stroke } = props;

  return (
    <DangerSVG
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
      stroke={stroke ? stroke : "#2B3F6C"}
    />
  );
};

export default DangerIcon;
