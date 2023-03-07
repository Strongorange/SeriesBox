import React from "react";
import HomeSVG from "../../public/icons/bottomNav/Home.svg";
import HomeFilledSVG from "../../public/icons/bottomNav/HomeFilled.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  filled?: boolean;
  stroke?: string;
};

const HomeIcon = (props: SVGIconProps) => {
  const { width, height, fill, filled, stroke } = props;

  if (filled) {
    return (
      <HomeFilledSVG
        width={width ? width : 24}
        height={height ? height : 24}
        fill="#ccaa4b"
        stroke="none"
      />
    );
  }

  return (
    <HomeSVG
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
      stroke="#000000"
    />
  );
};

export default HomeIcon;
