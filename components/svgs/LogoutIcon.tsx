import React from "react";
import Logout from "../../public/icons/header/Logout.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
};

const LogoutIcon = (props: SVGIconProps) => {
  const { width, height, fill } = props;
  return (
    <Logout
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
    />
  );
};

export default LogoutIcon;
