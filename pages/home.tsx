import React, { useEffect, useState } from "react";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "next/router";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);

  const { user } = useUserStore();
  useEffect(() => {
    if (user) {
      onSnapshot(collection(db, "series"), (querySnapshot) => {
        querySnapshot.docs.forEach((queryDocumentSnapshot) => {
          //TODO: queryDocumentSnapshot.id = "만화" queryDocumentSnapshot.data() === 데이터
        });
      });
    } else {
      console.log("home 에서 유저 없음");
      router.push("/");
    }
  }, [user]);

  return (
    <div className="flex flex-col w-full p-PageLR ">
      <h2>최근 사용한 시리즈</h2>
      <div className="flex flex-col"></div>
      <h2>시리즈 목록</h2>
      <div className="grid grid-cols-4 w-full"></div>
    </div>
  );
};

export default Home;
