import { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useUserStore } from "../stores/userStore";
import { useStateStore } from "../stores/stateStore";
import { useSeriesStore } from "../stores/seriesStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import PushToArrayModal from "../components/modals/PushToSeriesModal";

export default function App({ Component, pageProps }: AppProps) {
  const [appLoading, setAppLoading] = useState<boolean>(true);
  const router = useRouter();
  const { showPushPhotoToSeries, setState } = useStateStore();
  const { user: loggedInUser, setUser, isGuest, setIsGuest } = useUserStore();
  const { setSeries, series: storeSeries } = useSeriesStore();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        try {
          // 게스트 로그인시 게스트 true 아닐시 false
          if (user.email?.includes("guest")) {
            setIsGuest(true);
          } else {
            setIsGuest(false);
          }
          setUser(user);
          setAppLoading(false);
        } catch (e) {
          alert(e);
          console.log(e);
        }
      } else {
        //TODO: zustand 에서 유저 삭제
        setUser(null);
        // console.log("로그아웃 됨");
        router.push("/");
      }
    });

    if (storeSeries) {
      // console.log("storeSeries: ");
      // console.log(storeSeries);
    }
  }, [loggedInUser, setUser, appLoading, storeSeries]);

  useEffect(() => {
    if (loggedInUser) console.log(loggedInUser);
    console.log("게스트 상태");
    console.log(isGuest);
  }, [loggedInUser, isGuest]);

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <BottomNav />
      <PushToArrayModal
        isShow={showPushPhotoToSeries}
        toggleShow={() => setState("showPushPhotoToSeries", false)}
      />
    </>
  );
}
