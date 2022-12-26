import { ChangeEvent, FormEvent, useState } from "react";
import "../firebase";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

export default function Home() {
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setInputVal({
      ...inputVal,
      [name]: value,
    });
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setPersistence(auth, browserLocalPersistence);
      signInWithEmailAndPassword(auth, inputVal.email, inputVal.password)
        .then((userCredential) => {
          //
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
    <div className="w-full bg-amber-200 h-screen flex justify-center items-center">
      <form
        className="w-full flex flex-col items-center scale-150"
        onSubmit={handleLogin}
      >
        <label htmlFor="email">아이디 입력</label>
        <input type="email" name="email" id="email" onChange={handleInput} />
        <label htmlFor="password">비밀번호 입력</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleInput}
        />
        <button type="submit" className="w-4 bg-purple-300">
          로그인
        </button>
      </form>
    </div>
  );
}
