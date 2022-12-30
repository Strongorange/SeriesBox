import { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useUserStore } from "../stores/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default function App({ Component, pageProps }: AppProps) {
  const [appLoading, setAppLoading] = useState<boolean>(true);
  const router = useRouter();
  const { user: loggedInUser, setUser } = useUserStore();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        try {
          setUser(user);
          setAppLoading(false);
        } catch (e) {
          alert(e);
          console.log(e);
        }
      } else {
        //TODO: zustand 에서 유저 삭제
        setUser(null);
        console.log("로그아웃 됨");
        router.push("/");
      }
    });
  }, [loggedInUser, setUser, appLoading]);

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <BottomNav />
    </>
  );
}
