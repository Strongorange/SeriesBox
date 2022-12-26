import { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useUserStore } from "../stores/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function App({ Component, pageProps }: AppProps) {
  const { user: loggedInUser, setUser } = useUserStore();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        try {
          //TODO: zustand 에 유저 저장 후 로그인 검증 후 로그인 페이지 표시
          setUser(user);
        } catch (e) {
          alert(e);
          console.log(e);
        } finally {
          console.log("loggedInUser");
          console.log(loggedInUser);
        }
      } else {
        //TODO: zustand 에서 유저 삭제
      }
    });
  }, [loggedInUser, setUser]);

  return <Component {...pageProps} />;
}
