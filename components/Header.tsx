import React, { useEffect } from "react";
import { useUserStore } from "../stores/userStore";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

const Header = () => {
  const { user } = useUserStore();
  const router = useRouter();

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

  if (window.location.pathname === "/") return null;

  return (
    <div className="w-full justify-between h-[7vh] flex items-center bg-green-200 p-5">
      <div>프로필</div>
      <div>Series</div>
      <div onClick={handleSignInOut}>{user ? "로그아웃" : "로그인"}</div>
    </div>
  );
};

export default Header;
