import React from "react";
import TrashIcon from "./svgs/TrashIcon";

interface SelectingBottomNavI {
  isShow: boolean;
  toggleShowDialog: () => void;
}

const SelectingBottomNav = (props: SelectingBottomNavI) => {
  const { isShow, toggleShowDialog } = props;

  return (
    <div
      className={`bottomNav z-selecting-bottom-nav ${
        isShow
          ? "animate-selecting-bottom-nav"
          : "animate-selecting-bottom-nav-reverse"
      } `}
    >
      <div
        className="flex w-full flex-col justify-center items-center"
        onClick={toggleShowDialog}
      >
        <TrashIcon />
      </div>
    </div>
  );
};

export default SelectingBottomNav;
