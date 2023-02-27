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
  const [headerCenter, setHeaderCenter] = useState("");

  useEffect(() => {
    if (router) {
      if (router.pathname === "/home") {
        setIsHome(true);
      } else {
        setIsHome(false);
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
    <div className="topHeader">
      <div onClick={goBack}>
        {isHome ? (
          <Link href={`/profile/321`}>
            <ProfileIcon />
          </Link>
        ) : (
          <LeftIcon />
        )}
      </div>
      <div>{!isHome && headerCenter ? <h4> {headerCenter} </h4> : ""}</div>
      <div>
        {isHome && user ? (
          <div onClick={handleSignInOut}>
            <LogoutIcon />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
