import React from "react";
import User from "../../public/icons/header/User.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  stroke?: string;
};

const ProfileIcon = (props: SVGIconProps) => {
  const { width, height, fill, stroke } = props;
  return (
    <User
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "#2B3F6C"}
      stroke={stroke ? stroke : "#2B3F6C"}
    />
  );
};

export default ProfileIcon;
