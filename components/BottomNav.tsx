import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStateStore } from "../stores/stateStore";

const BottomNav = () => {
  const router = useRouter();
  const { setState, showPushPhotoToSeries } = useStateStore();

  const showAddSeries = () => {
    if (router.pathname === "/home") {
      setState("showAddPhoto", true);
    }

    if (router.query.sid) {
      //TODO: 현재 시즈ㅣ data Array 에 사진 추가하는 모달 띄우기
      setState("showPushPhotoToSeries", true);
      console.log(showPushPhotoToSeries);
    }
  };

  if (router.pathname === "/") return null;

  return (
    <div className="bottomNav">
      <div className="flexCenter">
        <Link href="/home">Home</Link>
      </div>
      <div className="flexCenter">
        <Link href="/search">Search</Link>
      </div>
      <div className="flexCenter" onClick={showAddSeries}>
        사진추가
      </div>
      <div className="flexCenter">
        <Link href="/photos/favorites">Favorites</Link>
      </div>
      <div className="flexCenter">
        <Link href="/settings">Setting</Link>
      </div>
    </div>
  );
};

export default BottomNav;
