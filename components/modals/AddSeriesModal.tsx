import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { SeriesItem } from "../../stores/seriesStore";
import { useUserStore } from "../../stores/userStore";

interface TempObj extends SeriesItem {
  thumbUrl?: string;
  thumbName?: string;
}

interface AddSeriesModalProps {
  isShow: boolean;
  toggleShow: () => void;
}

interface InputStateI {
  seriesName: string;
  localFilePath: string;
  uploadFileBlob: Blob | null;
  uploadFileObj?: object;
  thumbLocalFilePath: string;
  thumbUploadFileBlob: Blob | null;
  thumbFileObj?: object;
}

const AddSeriesModal = (props: AddSeriesModalProps) => {
  const { isShow, toggleShow } = props;
  const [showComponent, setShowComponent] = useState(false);
  const [inputState, setInputState] = useState<InputStateI>({
    seriesName: "",
    localFilePath: "",
    uploadFileBlob: null,
    uploadFileObj: {},
    thumbLocalFilePath: "",
    thumbUploadFileBlob: null,
    thumbFileObj: {},
  });
  const [processing, setProcessing] = useState(false);
  const { user, isGuest } = useUserStore();

  const resetInputState = () => {
    setInputState({
      seriesName: "",
      localFilePath: "",
      uploadFileBlob: null,
      uploadFileObj: {},
      thumbLocalFilePath: "",
      thumbUploadFileBlob: null,
      thumbFileObj: {},
    });
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const loadLocalFile = (
    e: ChangeEvent<HTMLInputElement>,
    type: "thumb" | "upload"
  ) => {
    e.preventDefault();
    try {
      if (e.target.files) {
        // console.log(e.target.files[0]);
        // console.log(e.target.files);
        const blob = e.target.files[0];
        const path = URL.createObjectURL(e.target.files[0]);
        // console.log(path);
        if (type === "upload") {
          setInputState({
            ...inputState,
            localFilePath: path,
            uploadFileBlob: blob,
            uploadFileObj: e.target.files[0],
          });
        } else if (type === "thumb") {
          setInputState({
            ...inputState,
            thumbLocalFilePath: path,
            thumbUploadFileBlob: blob,
            thumbFileObj: e.target.files[0],
          });
        }
      }
    } catch (error) {
      alert("사진을 불러올 수 없습니다.");
    }
  };

  const makeNewSeries = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputState.seriesName === "") {
      alert("시리즈 이름을 입력해주세요!");
    }

    if (user) {
      try {
        //Firebase 에 도큐먼트 만들고 데이터 추가하기
        setProcessing(true);
        // 입력한 시리즈가 중복되는지 검증
        // isGuest 에 따라 다른 컬렉션 설정
        const docRef = doc(
          db,
          !isGuest ? "series" : "seriesGuest",
          String(inputState.seriesName)
        );
        const docSnap = await getDoc(docRef);
        const docExists = docSnap.exists();
        let thumbTempObj: TempObj = {
          fileUrl: "",
          fileName: "",
          owenrUid: "",
          createdAt: "",
          thumbUrl: "",
          thumbName: "",
        };

        let photoTempObj: TempObj = {
          fileUrl: "",
          fileName: "",
          owenrUid: "",
          createdAt: "",
          thumbUrl: "",
          thumbName: "",
        };

        if (docExists) {
          // console.log("도큐먼트 존재!!!");
          alert(
            "이미 존재하는 시리즈입니다. 시리즈에서 사진을 추가해주세요 :)"
          );
        } else {
          // 문서 생성하고 데이터 추가, Firebase Cloud Storage 에 사진 업로드 후 Url, Name 받아서 업데이트, CreatedAt도 현재 날짜로
          if (!inputState.uploadFileBlob && !inputState.thumbUploadFileBlob) {
            alert("썸네일, 사진을 선택했는지 확인해주세요 :)");
            setProcessing(false);
            return;
          }

          //FIXME: 썸네일 파일과 사진 업로드 하나로 통합
          const thumbFileName = inputState.thumbUploadFileBlob?.name;
          const uploadFileName = inputState.uploadFileBlob?.name;
          const thumbFileRef = ref(
            storage,
            `${inputState.seriesName}/${thumbFileName}`
          );
          const uploadFileRef = ref(
            storage,
            `${inputState.seriesName}/${uploadFileName}`
          );
          const thumbUploadData = await uploadBytes(
            thumbFileRef,
            inputState.thumbUploadFileBlob!
          );
          const thumbDownloadUrl = await getDownloadURL(thumbFileRef);

          const photoUploadData = await uploadBytes(
            uploadFileRef,
            inputState.uploadFileBlob!
          );
          const photoDownloadUrl = await getDownloadURL(uploadFileRef);
          thumbTempObj.fileName = String(thumbFileName);
          thumbTempObj.fileUrl = thumbDownloadUrl;
          thumbTempObj.createdAt = thumbUploadData.metadata.timeCreated;
          thumbTempObj.owenrUid = user?.uid;

          photoTempObj.fileName = String(uploadFileName);
          photoTempObj.fileUrl = photoDownloadUrl;
          photoTempObj.createdAt = photoUploadData.metadata.timeCreated;
          photoTempObj.owenrUid = user?.uid;

          await setDoc(
            doc(db, !isGuest ? "series" : "seriesGuest", inputState.seriesName),
            {
              data: [
                {
                  createdAt: photoTempObj.createdAt,
                  fileName: photoTempObj.fileName,
                  fileUrl: photoTempObj.fileUrl,
                  ownerUid: photoTempObj.owenrUid,
                },
              ],
              docPhotoUrl: thumbTempObj.fileUrl,
            }
          );
          setProcessing(false);
          resetInputState();
          alert("업로드 완료!");
        }
      } catch (error) {
        alert("오류 발생");
        // console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log(inputState);
  }, [inputState]);

  // 언마운트 애니메이션을 위해 애니메이션 길이만큼 showComponent 상태 딜레이
  // div 에서는 showComponent 가 아닌 즉시 바뀌는 isShow 조건으로 애니메이션을 실행하고 딜레이 후 바뀐 showComponent 조건으로 컴포넌트 언마운트
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (!isShow) {
      timerId = setTimeout(() => {
        setShowComponent(false);
      }, 500);
    } else {
      setShowComponent(isShow);
    }
  }, [isShow, showComponent]);

  if (!showComponent) return null;

  return (
    <div
      className={`fixed top-0 z-50 box-border flex h-screen w-full animate-fade-in items-center justify-center overflow-auto ${
        !isShow && "animate-fade-out"
      }`}
    >
      <div className="fixed h-full w-full bg-[rgba(0,0,0,0.5)]" />
      <div className="absolute flex max-h-screen w-[90%] flex-col rounded-3xl bg-Secondary p-8 text-Primary md:w-[50%]">
        <div
          className="flex items-center justify-end"
          onClick={() => {
            toggleShow();
            resetInputState();
            setProcessing(false);
          }}
        >
          닫기
        </div>
        <div className="flex w-full flex-col gap-10">
          <form
            encType="multipart/form-data"
            onSubmit={makeNewSeries}
            id="addSeriesForm"
            className="flex w-full flex-col gap-5"
          >
            <div className="flex flex-col gap-5">
              <label htmlFor="seriesName">
                <h3>시리즈 이름</h3>
              </label>
              <input
                id="seriesName"
                type="text"
                className="h-[4vh] w-full rounded-3xl border-2 p-2"
                placeholder="시리즈 이름"
                name="seriesName"
                onChange={onChangeInput}
              />
            </div>

            <div className="flex flex-col gap-5">
              <label htmlFor="seriesThumbPhoto">
                <h3>시리즈 썸네일 선택 (선택)</h3>
              </label>
              {inputState.thumbLocalFilePath && (
                <div>
                  <Image
                    alt="업로드할 사진"
                    src={inputState.thumbLocalFilePath}
                    width={100}
                    height={100}
                  />
                </div>
              )}
              <input
                id="seriesThumbPhoto"
                type="file"
                accept="image/*"
                onChange={(e) => loadLocalFile(e, "thumb")}
              />
            </div>
            <div className="flex flex-col gap-5">
              <label htmlFor="seriesPhoto">
                <h3>사진 선택 (선택)</h3>
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
                accept="image/*"
                onChange={(e) => loadLocalFile(e, "upload")}
              />
            </div>
          </form>
          <button
            type="submit"
            className={` box-border rounded-3xl p-5 text-lg text-Secondary ${
              processing ? "bg-gray-50 text-zinc-200" : "bg-Primary"
            }`}
            form="addSeriesForm"
            disabled={processing}
          >
            시리즈 만들기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSeriesModal;
