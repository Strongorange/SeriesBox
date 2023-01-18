import React from "react";
import Search from "../../public/icons/bottomNav/Search.svg";
import SearchFilled from "../../public/icons/bottomNav/SearchFilled.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  filled?: boolean;
};

const SearchIcon = (props: SVGIconProps) => {
  const { width, height, fill, filled } = props;

  if (filled) {
    return (
      <SearchFilled
        width={width ? width : 24}
        height={height ? height : 24}
        fill={fill ? fill : "none"}
      />
    );
  }

  return (
    <Search
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
    />
  );
};

export default SearchIcon;
