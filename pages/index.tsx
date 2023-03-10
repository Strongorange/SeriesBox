import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../firebase";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { useUserStore } from "../stores/userStore";
import InitialVideo from "../components/InitialVideo";

export default function Home() {
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { user } = useUserStore();
  //개인용, 공개용 캐릭터 영상 여부
  const [showMuza, setShowMuza] = useState(true);

  useEffect(() => {
    const localStorageUser = localStorage.getItem("loggedInUser");
    if (user || localStorageUser) {
      router.push("/home");
    }
  }, [user]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setInputVal({
      ...inputVal,
      [name]: value,
    });
  };

  const handleLogin = (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    isGuest?: boolean
  ) => {
    e.preventDefault();
    try {
      setPersistence(auth, browserLocalPersistence);
      signInWithEmailAndPassword(
        auth,
        !isGuest ? inputVal.email : "guest@example.com",
        !isGuest ? inputVal.password : "121212"
      )
        .then((userCredential) => {
          router.push("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          console.log(`firebase login Error : ${errorCode}`);
        });
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

  return (
    <>
      {showMuza && <InitialVideo />}
      <div className="flex h-screen  w-full flex-col items-center justify-center gap-3 bg-Secondary">
        <form
          className="box-border flex w-3/4 flex-col items-center gap-3 rounded-3xl border-2 p-10 md:w-1/2"
          onSubmit={handleLogin}
        >
          <h1 className="text-Primary">Login</h1>
          <div className="mt-14 flex w-full flex-col items-center gap-4">
            <label
              htmlFor="email"
              className="self-start text-xl text-Primary md:text-2xl"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInput}
              placeholder="example@gmail.com"
              className="h-10 w-full rounded-3xl px-4 text-lg transition-all duration-500 focus:h-16 focus:border-2 focus:border-solid focus:border-Primary focus:outline-none md:h-16 md:text-xl md:focus:h-24"
            />
            <label
              htmlFor="password"
              className="self-start text-xl text-Primary md:text-2xl"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleInput}
              placeholder="******"
              className="h-10 w-full rounded-3xl px-4 text-lg transition-all duration-500 focus:h-16 focus:border-2 focus:border-solid focus:border-Primary focus:outline-none md:h-16 md:text-xl md:focus:h-24"
            />
          </div>
          <button
            type="submit"
            className="scaleUpOnHover-125 mt-10 h-10 w-[50%] rounded-3xl bg-Primary  text-Secondary md:h-14 md:text-xl"
          >
            로그인
          </button>

          <button
            type="submit"
            className="md:text-x scaleUpOnHover-125 h-10 w-[50%] animate-pulse rounded-3xl bg-Accent  text-Secondary md:h-14"
            onClick={(e) => handleLogin(e, true)}
          >
            <p>게스트</p>
            <div className="absolute"></div>
          </button>
        </form>
      </div>
    </>
  );
}
