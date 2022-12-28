import React, { useEffect } from "react";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  const { user } = useUserStore();
  useEffect(() => {
    if (user) {
      //
    } else {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="flex flex-col w-full p-PageLR ">
      <div className="flex flex-col">
        <h2>최근 사용한 시리즈</h2>
      </div>
      <div className="titleBase">시리즈 목록</div>
    </div>
  );
};

export default Home;
