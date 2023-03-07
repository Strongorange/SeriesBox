import React from "react";
import Favorites from "../../public/icons/bottomNav/Heart.svg";
import FavoritesFilled from "../../public/icons/bottomNav/HeartFilled.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  filled?: boolean;
  stroke?: string;
};

const FavoritesIcon = (props: SVGIconProps) => {
  const { width, height, fill, filled, stroke } = props;

  if (filled) {
    return (
      <FavoritesFilled
        width={width ? width : 24}
        height={height ? height : 24}
        fill="#ff5c00"
        stroke="none"
      />
    );
  }

  return (
    <Favorites
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
      stroke={stroke ? stroke : "#2B3F6C"}
    />
  );
};

export default FavoritesIcon;
