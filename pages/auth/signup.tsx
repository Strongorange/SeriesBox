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
    <div className="flex flex-col bg-amber-100 w-full h-screen p-PageLR">
      <div className="flex items-center h-[7vh]">
        <div onClick={() => router.push("/")}>
          <LeftIcon />
        </div>
      </div>

      <form
        className="w-full gap-3 flex flex-col h-[80%] justify-center items-center"
        onSubmit={(e) => handleSignUp(e)}
      >
        <label htmlFor="email">이메일 입력</label>
        <input
          type="email"
          name="email"
          id="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          onChange={(e) => handleInput(e)}
          className="w-[50%] h-10"
        />
        <label htmlFor="password">비밀번호 입력</label>
        <input
          type="password"
          name="password"
          id="password"
          minLength={6}
          onChange={(e) => handleInput(e)}
          className="w-[50%] h-10"
        />
        <label htmlFor="password">비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          minLength={6}
          onChange={(e) => handleInput(e)}
          className="w-[50%] h-10"
        />
        <button type="submit" className="w-[50%] h-10 bg-purple-300">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
