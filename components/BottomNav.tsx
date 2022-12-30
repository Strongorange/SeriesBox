import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const BottomNav = () => {
  const router = useRouter();

  if (router.pathname === "/") return null;

  return (
    <div className="bottomNav">
      <div className="flexCenter">
        <Link href="/home">Home</Link>
      </div>
      <div className="flexCenter">
        <Link href="/search">Search</Link>
      </div>
      <div className="flexCenter">
        <Link href="/photos/add">사진추가</Link>
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
