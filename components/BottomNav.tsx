import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStateStore } from "../stores/stateStore";
import HomeIcon from "./svgs/HomeIcon";
import SearchIcon from "./svgs/SearchIcon";
import FavoritesIcon from "./svgs/FavoritesIcon";
import SettingsIcon from "./svgs/SettingsIcon";

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
      <div className="flexCenter ">
        <Link href="/home">
          <HomeIcon />
        </Link>
      </div>
      <div className="flexCenter ">
        <Link href="/search">
          <SearchIcon />
        </Link>
      </div>
      <div className="flexCenter" onClick={showAddSeries}>
        사진추가
      </div>
      <div className="flexCenter">
        <Link href="/photos/favorites">
          <FavoritesIcon />
        </Link>
      </div>
      <div className="flexCenter">
        <Link href="/settings">
          <SettingsIcon />
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
