import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStateStore } from "../stores/stateStore";

const BottomNav = () => {
  const router = useRouter();
  const { setState, showAddPhoto } = useStateStore();

  const showAddSeries = () => {
    setState("showAddPhoto", true);
    console.log(showAddPhoto);
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
