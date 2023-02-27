import React from "react";
import DangerIcon from "../svgs/DangerIcon";

interface YesNoDialogItemI {
  isShow: boolean;
  isEditting: boolean;
  toggleIsShow: () => void;
  deleteFunc: () => void;
}

const YesNoDialogItem = (props: YesNoDialogItemI) => {
  const { isShow, isEditting, toggleIsShow, deleteFunc } = props;

  //TODO: 모달창 애니메이션

  return (
    <div
      className={`flex w-full justify-center items-center fixed top-0 left-0 h-screen z-modal box-border overflow-auto ${
        !isEditting && "invisible"
      } ${isShow ? "animate-fade-in" : "animate-fade-out"}`}
    >
      <div className="fixed w-full h-full bg-[rgba(0,0,0,0.5)]" />
      <div className="flex flex-col bg-white absolute w-[90%] rounded-3xl">
        <div className="w-full flex flex-col items-center justify-center gap-5 rounded-3xl overflow-auto pt-6 ">
          <div className="p-6 bg-[#F9E3E2] flex justify-center items-center rounded-full">
            <DangerIcon stroke="#CA3A31" />
          </div>
          <div className="flex w-full flex-col items-center justify-center">
            <h3 className="italic underline">
              {/* { ? documentId : "알 수 없는 시리즈"} */}
            </h3>
            <h4>정말 지우시겠습니까?</h4>
          </div>
          <div className="w-full flex justify-end p-4 py-6  bg-[#f2f2f2] gap-8">
            <button
              className=" py-2 px-10 rounded-2xl bg-[#CA3A31] text-white"
              onClick={deleteFunc}
            >
              <h4>네</h4>
            </button>
            <button
              className=" py-2 px-10 rounded-2xl border border-slate-400 "
              onClick={toggleIsShow}
            >
              <h4>아니요</h4>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YesNoDialogItem;
