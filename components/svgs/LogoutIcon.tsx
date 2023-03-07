import React from "react";
import Logout from "../../public/icons/header/Logout.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  stroke?: string;
};

const LogoutIcon = (props: SVGIconProps) => {
  const { width, height, fill, stroke } = props;
  return (
    <Logout
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "#2B3F6C"}
      stroke={stroke ? stroke : "#2B3F6C"}
    />
  );
};

export default LogoutIcon;
