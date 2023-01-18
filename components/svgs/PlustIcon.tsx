import React from "react";
import PlusSVG from "../../public/icons/bottomNav/Plus.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
};

const PlusIcon = (props: SVGIconProps) => {
  const { width, height, fill } = props;
  return (
    <PlusSVG
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
    />
  );
};

export default PlusIcon;
