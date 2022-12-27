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
  return <div>home</div>;
};

export default Home;
