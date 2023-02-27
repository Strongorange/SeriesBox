import React from "react";
import TrashIcon from "./svgs/TrashIcon";

interface SelectingBottomNavI {
  isShow: boolean;
  isEditting: boolean;
  toggleShowDialog: () => void;
}

const SelectingBottomNav = (props: SelectingBottomNavI) => {
  const { isShow, toggleShowDialog, isEditting } = props;

  return (
    <div
      className={`bottomNav z-selecting-bottom-nav ${
        isEditting && isShow
          ? "animate-selecting-bottom-nav"
          : isEditting && !isShow
          ? "animate-selecting-bottom-nav-reverse"
          : "hidden"
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
