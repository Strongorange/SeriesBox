import React from "react";
import Setting from "../../public/icons/bottomNav/Settings.svg";
import SettingFilled from "../../public/icons/bottomNav/SettingsFilled.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  filled?: boolean;
};

const SettingsIcon = (props: SVGIconProps) => {
  const { width, height, fill, filled } = props;

  if (filled) {
    return (
      <SettingFilled
        width={width ? width : 24}
        height={height ? height : 24}
        fill={fill ? fill : "none"}
      />
    );
  }

  return (
    <Setting
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
    />
  );
};

export default SettingsIcon;
