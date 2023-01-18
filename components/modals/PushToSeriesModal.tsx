import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { SeriesItem } from "../../stores/seriesStore";
import { useUserStore } from "../../stores/userStore";
import { useRouter } from "next/router";

interface AddSeriesModalProps {
  isShow: boolean;
  toggleShow: () => void;
}

interface InputStateI {
  seriesName: string;
  localFilePath: string;
  uploadFileBlob: FileList | null;
  thumbLocalFilePath: string;
  thumbUploadFileBlob: Blob | null;
}

const PushToArrayModal = (props: AddSeriesModalProps) => {
  const { isShow, toggleShow } = props;
  const router = useRouter();
  const [inputState, setInputState] = useState<InputStateI>({
    seriesName: "",
    localFilePath: "",
    uploadFileBlob: null,
    thumbLocalFilePath: "",
    thumbUploadFileBlob: null,
  });
  const [processing, setProcessing] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    return () => {
      setInputState({
        seriesName: "",
        localFilePath: "",
        uploadFileBlob: null,
        thumbLocalFilePath: "",
        thumbUploadFileBlob: null,
      });
    };
  }, []);

  const closeModal = () => {
    toggleShow();
    setInputState({
      seriesName: "",
      localFilePath: "",
      uploadFileBlob: null,
      thumbLocalFilePath: "",
      thumbUploadFileBlob: null,
    });
  };

  const loadLocalFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      if (e.target.files) {
        //FIXME: 파일 한개 불러오던걸 여러개 불러오기
        // console.log(e.target.files);
        const blobArray = e.target.files;
        const path = URL.createObjectURL(e.target.files[0]);
        setInputState({
          ...inputState,
          localFilePath: path,
          uploadFileBlob: blobArray,
        });
      }
    } catch (error) {
      alert("사진을 불러올 수 없습니다.");
    }
  };

  const uploadSeries = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputState.uploadFileBlob) {
      alert("업로드 할 사진을 추가해주세요!");
      return;
    }

    if (user) {
      try {
        setProcessing(true);
        const seriesDocRef = doc(db, "series", router.query.sid as string);
        //from inputstate.uploadFileBlob FileList update each file to firebase seriesDocRef

        for (let i = 0; i < inputState.uploadFileBlob.length; i++) {
          const file = inputState.uploadFileBlob[i];
          // console.log("파일");
          // console.log(file);
          const fileRef = ref(storage, `${router.query.sid}/${file.name}`);
          await uploadBytes(fileRef, file);
          const downloadURL = await getDownloadURL(fileRef);
          const seriesDoc = await getDoc(seriesDocRef);
          const seriesData = seriesDoc.data();
          if (seriesData) {
            // console.log(seriesData);
            const seriesItem: SeriesItem = {
              createdAt: String(new Date()),
              fileName: file.name,
              fileUrl: downloadURL,
              owenrUid: user.uid,
            };
            const newSeriesData = { ...seriesData };
            newSeriesData.data.push(seriesItem);
            await setDoc(seriesDocRef, newSeriesData);
          }
        }
        setProcessing(false);
        closeModal();
      } catch (error) {
        alert("오류 발생");
        // console.log(error);
      }
    }
  };

  if (!isShow) return null;

  return (
    <div className="flex w-full justify-center items-center fixed top-0 h-screen z-50 box-border">
      <div className="fixed w-full h-full bg-[rgba(0,0,0,0.5)]" />
      <div className="flex flex-col w-[90%] bg-white absolute p-8  ">
        <div className="flex items-center justify-end" onClick={closeModal}>
          닫기
        </div>
        <div className="flex flex-col w-full gap-10">
          <form
            encType="multipart/form-data"
            onSubmit={uploadSeries}
            id="addSeriesForm"
            className="flex flex-col w-full gap-5"
          >
            <h3>{router.query.sid} 시리즈에 추가</h3>

            <div className="flex flex-col gap-5">
              <label htmlFor="seriesPhoto">
                <h3>사진 선택 (선택)</h3>
              </label>
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
                multiple
                onChange={(e) => loadLocalFile(e)}
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
            사진 추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default PushToArrayModal;
