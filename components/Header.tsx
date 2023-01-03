import React, { useEffect, useState } from "react";
import { useUserStore } from "../stores/userStore";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

const Header = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const [isHome, setIsHome] = useState<boolean>(true);

  useEffect(() => {
    if (router) {
      if (router.pathname === "/home") {
        setIsHome(true);
      } else {
        setIsHome(false);
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

  return (
    <div className="topHeader">
      <div onClick={goBack}>{isHome ? "프로필" : "뒤로가기"}</div>
      <div>Series</div>
      <div onClick={handleSignInOut}>
        {user ? "로그아웃 아이콘" : "로그인 아이콘"}
      </div>
    </div>
  );
};

export default Header;
