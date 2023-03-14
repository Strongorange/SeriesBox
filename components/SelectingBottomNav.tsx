import React, { useEffect } from "react";
import TrashIcon from "./svgs/TrashIcon";
import { useStateStore } from "../stores/stateStore";

interface SelectingBottomNavI {
  isShow: boolean;
  isEditting: boolean;
  toggleShowDialog: () => void;
}

const SelectingBottomNav = (props: SelectingBottomNavI) => {
  const { isShow, toggleShowDialog, isEditting } = props;
  const { showBottomNav, setShowBottomNav } = useStateStore();

  useEffect(() => {
    const flag = isEditting && isShow;
    setShowBottomNav(!flag);
  }, [isEditting, isShow]);

  useEffect(() => {
    // console.log(showBottomNav);
  }, [showBottomNav]);

  return (
    <div
      className={`bottomNav  ${
        isEditting && isShow
          ? "bottom-0 animate-selecting-bottom-nav"
          : "animate-selecting-bottom-nav-reverse"
      } `}
    >
      <div
        className="scaleUpOnHover-125 flex w-full cursor-pointer flex-col items-center justify-center"
        onClick={toggleShowDialog}
      >
        <TrashIcon />
      </div>
    </div>
  );
};

export default SelectingBottomNav;
