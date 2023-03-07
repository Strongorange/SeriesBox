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
      className={`fixed top-0 left-0 z-modal box-border flex h-screen w-full items-center justify-center overflow-auto ${
        !isEditting && "invisible"
      } ${isShow ? "animate-fade-in" : "animate-fade-out"}`}
    >
      <div className="fixed h-full w-full bg-[rgba(0,0,0,0.5)]" />
      <div className="absolute flex w-[90%] flex-col rounded-3xl bg-white">
        <div className="flex w-full flex-col items-center justify-center gap-5 overflow-auto rounded-3xl pt-6 ">
          <div className="flex items-center justify-center rounded-full bg-[#F9E3E2] p-6">
            <DangerIcon stroke="#CA3A31" />
          </div>
          <div className="flex w-full flex-col items-center justify-center">
            <h3 className="italic underline">
              {/* { ? documentId : "알 수 없는 시리즈"} */}
            </h3>
            <h4>정말 지우시겠습니까?</h4>
          </div>
          <div className="flex w-full justify-end gap-8 bg-[#f2f2f2]  p-4 py-6">
            <button
              className=" rounded-2xl bg-[#CA3A31] py-2 px-10 text-white"
              onClick={deleteFunc}
            >
              <h4>네</h4>
            </button>
            <button
              className=" rounded-2xl border border-slate-400 py-2 px-10 "
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
