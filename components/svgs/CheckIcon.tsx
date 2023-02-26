import React from "react";
import CheckSVG from "../../public/icons/Check.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
};

const CheckIcon = (props: SVGIconProps) => {
  const { width, height, fill } = props;

  return (
    <CheckSVG
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
    />
  );
};

export default CheckIcon;
