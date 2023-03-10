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

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const [appLoading, setAppLoading] = useState<boolean>(true);
  const router = useRouter();
  const { showPushPhotoToSeries, setState } = useStateStore();
  const { user: loggedInUser, setUser, isGuest, setIsGuest } = useUserStore();
  const { series: storeSeries } = useSeriesStore();
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
          // 유저 상태와 로컬스토리지에 저장
          setUser(user);
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          setAppLoading(false);
        } catch (e) {
          alert(e);
          console.log(e);
        }
      } else {
        //TODO: zustand 에서 유저 삭제
        setUser(null);
        localStorage.setItem("loggedInUser", "");
        // console.log("로그아웃 됨");
        router.push("/");
      }
    });

    if (storeSeries) {
      // console.log("storeSeries: ");
      // console.log(storeSeries);
    }
  }, [loggedInUser, setUser, appLoading, storeSeries]);

  //게스트 상태 추적
  useEffect(() => {
    // if (loggedInUser) console.log(loggedInUser);
    // console.log("게스트 상태");
    // console.log(isGuest);
  }, [loggedInUser, isGuest]);

  // 모든 페이지에서 유저 존재 검증 후 페이지 이동
  useEffect(() => {
    // 1. 처음에 로컬스토리지를 참조해 저장된 유저가 있는지 판단
    const localStorageUser = localStorage.getItem("loggedInUser");
    // 1-1. 로컬스토리지에 유저가 있다면 loggedInUser 상태를 로컬스토리지 값으로 업데이트
    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
      // 2. 로컬 스토리지에 유저가 없다면 loggedInUser 상태에 유저가 존재하는지 판단
    } else {
      // 2-1 loggedInUser 상태에 유저가 존재한다면 로컬스토리지에 loggedInUser 상태로 없데이트
      if (loggedInUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        // 2-2 유저가 없다면 로그인 안된 것으로 판단해 홈으로 보냄
      } else {
        router.push("/");
      }
    }

    // favoritesItems 초기화
    // 1. localStorage 에 favoritesItems 배열이 있는지 확인
    const localStorageFavoriteItems = localStorage.getItem("favoritesItems");
    // 1-1 없다면 favoriteItems 라는 빈 배열을 localstorage 에 저장
    if (!localStorageFavoriteItems === null) {
      localStorage.setItem("favoriteItems", JSON.stringify([]));
    }
  }, []);

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
