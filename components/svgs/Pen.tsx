import React from "react";
import PenSVG from "../../public/icons/Pen.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
};

const PenIcon = (props: SVGIconProps) => {
  const { width, height, fill } = props;

  return (
    <PenSVG
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
    />
  );
};

export default PenIcon;
