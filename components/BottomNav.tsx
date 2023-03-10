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
  const { setState, showBottomNav } = useStateStore();

  const showAddSeries = () => {
    if (router.pathname === "/home") {
      setState("showAddPhoto", true);
    }

    if (router.query.sid) {
      // 현재 시리즈 data Array 에 사진 추가하는 모달 띄우기
      setState("showPushPhotoToSeries", true);
    }
  };

  if (router.pathname === "/") return null;
  if (router.pathname.includes("/auth")) return null;

  return (
    <div
      className={`fixed bottom-0 z-bottom-nav flex h-[7vh] w-full items-center justify-between border-t-[1px] bg-Secondary p-Nav md:px-PageLR md:py-3  ${
        showBottomNav
          ? "animate-selecting-bottom-nav"
          : "animate-selecting-bottom-nav-reverse"
      }`}
    >
      <div className="flexCenter scaleUpOnHover-125">
        <Link href="/home">
          <HomeIcon filled={router.pathname === "/home"} />
        </Link>
      </div>
      {/* <div className="flexCenter ">
        <Link href="/search">
          <SearchIcon filled={router.pathname.includes("/search")} />
        </Link>
      </div> */}
      <div className="flexCenter relative" onClick={showAddSeries}>
        <div className="scaleUpOnHover-125 fixed bottom-[3.5vh] flex aspect-square h-[7vh] items-center justify-center rounded-full bg-Accent">
          <PlusIcon stroke="#ffffff" />
        </div>
      </div>

      <div className="flexCenter scaleUpOnHover-125">
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
