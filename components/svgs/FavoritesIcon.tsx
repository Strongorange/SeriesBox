import React from "react";
import Favorites from "../../public/icons/bottomNav/Heart.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
};

const FavoritesIcon = (props: SVGIconProps) => {
  const { width, height, fill } = props;
  return (
    <Favorites
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
    />
  );
};

export default FavoritesIcon;
