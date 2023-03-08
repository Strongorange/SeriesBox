import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { SeriesItem } from "../../stores/seriesStore";
import { useUserStore } from "../../stores/userStore";
import { useRouter } from "next/router";
import ImageIcon from "../svgs/ImageIcon";

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
  const [showComponent, setShowComponent] = useState(false);
  const { user, isGuest } = useUserStore();

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
        const seriesDocRef = doc(
          db,
          !isGuest ? "series" : "seriesGuest",
          router.query.sid as string
        );
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

  useEffect(() => {
    let timderId: NodeJS.Timeout;
    if (!isShow) {
      timderId = setTimeout(() => {
        setShowComponent(false);
      }, 500);
    } else {
      setShowComponent(isShow);
    }
  }, [isShow, showComponent]);

  if (!showComponent) return null;

  return (
    <div
      className={`fixed top-0 z-50 box-border  flex h-screen w-full animate-fade-in items-center justify-center overflow-auto ${
        !isShow && "animate-fade-out"
      }`}
    >
      <div className="fixed h-full w-full bg-[rgba(0,0,0,0.5)]" />
      <div className="absolute flex w-[90%] flex-col rounded-3xl  bg-Secondary p-8 text-Primary md:w-[50%]">
        <div className="flex items-center justify-end" onClick={closeModal}>
          닫기
        </div>
        <div className="flex w-full flex-col gap-10">
          <form
            encType="multipart/form-data"
            onSubmit={uploadSeries}
            id="addSeriesForm"
            className="flex w-full flex-col gap-5"
          >
            <div className="flex flex-col items-center gap-5">
              <label
                htmlFor="seriesPhoto"
                className="flex flex-col items-center"
              >
                <h4>사진 선택</h4>
                {!inputState.localFilePath && (
                  <div>
                    <ImageIcon width={100} height={100} stroke="#ccaa4b" />
                  </div>
                )}
              </label>

              {inputState.localFilePath && (
                <div>
                  <Image
                    alt="업로드할 사진"
                    src={inputState.localFilePath}
                    width={100}
                    height={100}
                  />
                </div>
              )}
              <input
                id="seriesPhoto"
                type="file"
                accept="image/*, video/*"
                multiple
                onChange={(e) => loadLocalFile(e)}
                className="hidden"
              />
            </div>
          </form>
          <button
            type="submit"
            className={` box-border rounded-3xl p-5 text-lg text-Secondary  ${
              processing ? "bg-gray-50 text-zinc-200" : "bg-Accent"
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
