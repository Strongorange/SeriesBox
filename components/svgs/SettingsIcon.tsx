import React from "react";
import Setting from "../../public/icons/bottomNav/Settings.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
};

const SettingsIcon = (props: SVGIconProps) => {
  const { width, height, fill } = props;
  return (
    <Setting
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
    />
  );
};

export default SettingsIcon;
