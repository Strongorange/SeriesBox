import React from "react";
import Search from "../../public/icons/bottomNav/Search.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
};

const SearchIcon = (props: SVGIconProps) => {
  const { width, height, fill } = props;
  return (
    <Search
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
    />
  );
};

export default SearchIcon;
