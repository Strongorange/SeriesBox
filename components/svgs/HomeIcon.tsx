import React from "react";
import HomeSVG from "../../public/icons/bottomNav/Home.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
};

const HomeIcon = (props: SVGIconProps) => {
  const { width, height, fill } = props;
  return (
    <HomeSVG
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
    />
  );
};

export default HomeIcon;
