import React from "react";
import User from "../../public/icons/header/User.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
};

const ProfileIcon = (props: SVGIconProps) => {
  const { width, height, fill } = props;
  return (
    <User
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
    />
  );
};

export default ProfileIcon;
