import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { db } from "../../firebase";

interface AddSeriesModalProps {
  isShow: boolean;
  toggleShow: () => void;
}

interface InputStateI {
  seriesName: string;
  localFilePath: string;
}

const AddSeriesModal = (props: AddSeriesModalProps) => {
  const { isShow, toggleShow } = props;
  const [inputState, setInputState] = useState<InputStateI>({
    seriesName: "",
    localFilePath: "",
  });
  const [processing, setProcessing] = useState(false);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const loadLocalFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      if (e.target.files) {
        const path = URL.createObjectURL(e.target.files[0]);
        console.log(path);
        setInputState({ ...inputState, localFilePath: path });
      }
    } catch (error) {
      alert("사진을 불러올 수 없습니다.");
    }
  };

  const makeNewSeries = async (e: FormEvent<HTMLFormElement>) => {
    console.log("제출");
    e.preventDefault();

    if (inputState.seriesName === "") {
      alert("시리즈 이름을 입력해주세요!");
    }

    try {
      //TODO: Firebase 에 도큐먼트 만들고 데이터 추가하기
      setProcessing(true);
      //TODO: 입력한 시리즈가 중복되는지 검증
      const docRef = doc(db, "series", String(inputState.seriesName));
      const docSnap = await getDoc(docRef);
      const docExists = docSnap.exists();
      if (docExists) {
        console.log("도큐먼트 존재!!!");
        alert("이미 존재하는 시리즈입니다. 시리즈에서 사진을 추가해주세요 :)");
      } else {
        //TODO: 문서 생성하고 데이터 추가, Firebase Cloud Storage 에 사진 업로드 후 Url, Name 받아서 업데이트, CreatedAt도 현재 날짜로
        await setDoc(doc(db, "series", inputState.seriesName), {
          data: [
            {
              createdAt: "string",
              fileName: "파일네임",
              fileUrl:
                "https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
              ownerUid: "zustand의 Uid",
            },
          ],
          docPhotoUrl:
            "https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
        });
      }
    } catch (error) {
      alert("오류 발생");
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    console.log(inputState.localFilePath);
  }, [inputState.localFilePath]);

  if (!isShow) return null;

  return (
    <div className="flex w-full justify-center items-center fixed top-0 h-screen z-50 box-border">
      <div className="fixed w-full h-full bg-[rgba(0,0,0,0.5)]" />
      <div className="flex flex-col w-[90%] bg-white absolute p-8  ">
        <div className="flex items-center justify-end" onClick={toggleShow}>
          닫기
        </div>
        <div className="flex flex-col w-full">
          <form
            encType="multipart/form-data"
            onSubmit={makeNewSeries}
            id="addSeriesForm"
          >
            <div>
              <label htmlFor="seriesName">
                <h3>시리즈 이름</h3>
              </label>
              <input
                id="seriesName"
                type="text"
                className="w-full border-2 h-[4vh] p-2"
                placeholder="시리즈 이름"
                name="seriesName"
                onChange={onChangeInput}
              />
            </div>
            <div>
              <label htmlFor="seriesPhoto">
                <h3>사진 선택 (선택)</h3>
              </label>
              {/** TODO: 사진 있으면 사진 띄우기 */}
              {inputState.localFilePath && (
                <div>
                  <Image
                    alt="업로드할 사진"
                    src={inputState.localFilePath}
                    width={200}
                    height={200}
                  />
                </div>
              )}
              <input
                id="seriesPhoto"
                type="file"
                accept="image/*"
                onChange={loadLocalFile}
              />
            </div>
          </form>
          <button
            type="submit"
            className={` box-border p-5 ${
              processing ? "bg-gray-50 text-zinc-200" : "bg-amber-200"
            }`}
            form="addSeriesForm"
            disabled={processing}
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSeriesModal;
