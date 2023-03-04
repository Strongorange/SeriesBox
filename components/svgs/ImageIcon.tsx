import React from "react";
import ImageSVG from "../../public/icons/Image.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  stroke?: string;
};

const ImageIcon = (props: SVGIconProps) => {
  const { width, height, fill, stroke } = props;

  return (
    <ImageSVG
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
      stroke={stroke ? stroke : "#2B3F6C"}
    />
  );
};

export default ImageIcon;
