import React from "react";
import Left from "../../public/icons/header/Left.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
};

const LeftIcon = (props: SVGIconProps) => {
  const { width, height, fill } = props;
  return (
    <Left
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
    />
  );
};

export default LeftIcon;
