import React from "react";
import TrashSVG from "../../public/icons/Trash.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  stroke?: string;
};

const TrashIcon = (props: SVGIconProps) => {
  const { width, height, fill, stroke } = props;

  return (
    <TrashSVG
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
      stroke={stroke ? stroke : "#2B3F6C"}
    />
  );
};

export default TrashIcon;
