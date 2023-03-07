import React, { useEffect, useState } from "react";
import LeftIcon from "../../components/svgs/LeftIcon";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setInputVal({
      ...inputVal,
      [name]: value,
    });
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    // 회원가입 로직
    e.preventDefault();
    if (isValid) {
    } else {
      alert("입력을 확인해주세요");
    }
  };

  useEffect(() => {
    if (
      inputVal.email &&
      inputVal.password &&
      inputVal.password === inputVal.confirmPassword
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [inputVal]);

  return (
    <div className="flex h-screen w-full flex-col bg-amber-100 p-PageLR">
      <div className="flex h-[7vh] items-center">
        <div onClick={() => router.push("/")}>
          <LeftIcon />
        </div>
      </div>

      <form
        className="flex h-[80%] w-full flex-col items-center justify-center gap-3"
        onSubmit={(e) => handleSignUp(e)}
      >
        <label htmlFor="email">이메일 입력</label>
        <input
          type="email"
          name="email"
          id="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          onChange={(e) => handleInput(e)}
          className="h-10 w-[50%]"
        />
        <label htmlFor="password">비밀번호 입력</label>
        <input
          type="password"
          name="password"
          id="password"
          minLength={6}
          onChange={(e) => handleInput(e)}
          className="h-10 w-[50%]"
        />
        <label htmlFor="password">비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          minLength={6}
          onChange={(e) => handleInput(e)}
          className="h-10 w-[50%]"
        />
        <button type="submit" className="h-10 w-[50%] bg-purple-300">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
