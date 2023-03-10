import React, { useEffect, useState } from "react";
import { useUserStore } from "../stores/userStore";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import LogoutIcon from "./svgs/LogoutIcon";
import ProfileIcon from "./svgs/ProfileIcon";
import LeftIcon from "./svgs/LeftIcon";
import Link from "next/link";
import PenIcon from "./svgs/Pen";

const Header = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const [isHome, setIsHome] = useState<boolean>(true);
  const [isProfile, setIsProfile] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [headerCenter, setHeaderCenter] = useState("");

  useEffect(() => {
    if (router) {
      if (router.pathname === "/home") {
        setIsHome(true);
      } else {
        setIsHome(false);
      }

      if (router.pathname.includes("/profile/")) {
        setIsProfile(true);
      } else {
        setIsProfile(false);
      }

      if (router.pathname.includes("/photos/favorites")) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }

      if (router.query.sid) {
        setHeaderCenter(router.query.sid.toString());
        localStorage.setItem("currentSid", String(router.query.sid));
      } else {
        const currentSid = localStorage.getItem("currentSid");
        setHeaderCenter(currentSid!);
      }
    }
  }, [router.pathname]);

  const handleSignInOut = () => {
    if (user) {
      signOut(auth)
        .then()
        .catch((e) => {
          alert(e);
        });
    } else {
      router.push("/");
    }
  };

  const goBack = () => {
    if (router.pathname === "/home") {
      return null;
    } else {
      router.back();
    }
  };

  if (router.pathname === "/") return null;
  if (router.pathname.includes("/auth")) return null;

  return (
    <div className="topHeader text-Primary">
      <div onClick={goBack} className="scaleUpOnHover-125 cursor-pointer">
        {isHome ? (
          <Link href={`/profile/321`}>
            <ProfileIcon stroke="#ccaa4b" fill="none" />
          </Link>
        ) : (
          <LeftIcon stroke="#ccaa4b" />
        )}
      </div>
      {/* <div>{!isHome && headerCenter ? <h4> {headerCenter} </h4> : ""}</div> */}
      <div>
        {isHome && ""}
        {!isHome && isProfile && <h4>Profile</h4>}
        {!isHome && isFavorite && <h4>즐겨찾기</h4>}
        {!isHome && !isProfile && !isFavorite && headerCenter && (
          <h4>
            {headerCenter.length > 8
              ? `${headerCenter.slice(0, 8)}...`
              : headerCenter}
          </h4>
        )}
      </div>
      <div className="scaleUpOnHover-125 cursor-pointer">
        {isHome && user ? (
          <div onClick={handleSignInOut}>
            <LogoutIcon fill="none" stroke="#ccaa4b" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
