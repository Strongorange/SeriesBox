import React from "react";
import Message from "../../public/icons/Message.svg";

type SVGIconProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
};

const MessageIcon = (props: SVGIconProps) => {
  const { width, height, fill } = props;
  return (
    <Message
      width={width ? width : 24}
      height={height ? height : 24}
      fill={fill ? fill : "none"}
    />
  );
};

export default MessageIcon;
