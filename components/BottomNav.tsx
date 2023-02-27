import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStateStore } from "../stores/stateStore";
import HomeIcon from "./svgs/HomeIcon";
import SearchIcon from "./svgs/SearchIcon";
import FavoritesIcon from "./svgs/FavoritesIcon";
import SettingsIcon from "./svgs/SettingsIcon";
import PlusIcon from "./svgs/PlustIcon";

const BottomNav = () => {
  const router = useRouter();
  const { setState } = useStateStore();

  const showAddSeries = () => {
    if (router.pathname === "/home") {
      setState("showAddPhoto", true);
    }

    if (router.query.sid) {
      //TODO: 현재 시리즈 data Array 에 사진 추가하는 모달 띄우기
      setState("showPushPhotoToSeries", true);
    }
  };

  if (router.pathname === "/") return null;
  if (router.pathname.includes("/auth")) return null;

  return (
    <div className="bottomNav">
      <div className="flexCenter ">
        <Link href="/home">
          <HomeIcon filled={router.pathname === "/home"} />
        </Link>
      </div>
      {/* <div className="flexCenter ">
        <Link href="/search">
          <SearchIcon filled={router.pathname.includes("/search")} />
        </Link>
      </div> */}
      <div className="flexCenter" onClick={showAddSeries}>
        <PlusIcon />
      </div>
      <div className="flexCenter">
        <Link href="/photos/favorites">
          <FavoritesIcon filled={router.pathname.includes("/favorites")} />
        </Link>
      </div>
      {/* <div className="flexCenter">
        <Link href="/settings">
          <SettingsIcon filled={router.pathname.includes("/settings")} />
        </Link>
      </div> */}
    </div>
  );
};

export default BottomNav;
