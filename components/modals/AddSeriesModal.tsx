import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { SeriesItem } from "../../stores/seriesStore";
import { useUserStore } from "../../stores/userStore";
import ImageIcon from "../svgs/ImageIcon";
import CancelIcon from "../svgs/CancelIcon";

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
      alert("????????? ????????? ??? ????????????.");
    }
  };

  const makeNewSeries = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputState.seriesName === "") {
      alert("????????? ????????? ??????????????????!");
    }

    if (user) {
      try {
        //Firebase ??? ???????????? ????????? ????????? ????????????
        setProcessing(true);
        // ????????? ???????????? ??????????????? ??????
        // isGuest ??? ?????? ?????? ????????? ??????
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
          // console.log("???????????? ??????!!!");
          alert(
            "?????? ???????????? ??????????????????. ??????????????? ????????? ?????????????????? :)"
          );
        } else {
          // ?????? ???????????? ????????? ??????, Firebase Cloud Storage ??? ?????? ????????? ??? Url, Name ????????? ????????????, CreatedAt??? ?????? ?????????
          if (!inputState.uploadFileBlob && !inputState.thumbUploadFileBlob) {
            alert("?????????, ????????? ??????????????? ?????????????????? :)");
            setProcessing(false);
            return;
          }

          //FIXME: ????????? ????????? ?????? ????????? ????????? ??????
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
          alert("????????? ??????!");
          toggleShow();
        }
      } catch (error) {
        alert("?????? ??????");
        // console.log(error);
      }
    }
  };

  useEffect(() => {
    // console.log(inputState);
  }, [inputState]);

  // ???????????? ?????????????????? ?????? ??????????????? ???????????? showComponent ?????? ?????????
  // div ????????? showComponent ??? ?????? ?????? ????????? isShow ???????????? ?????????????????? ???????????? ????????? ??? ?????? showComponent ???????????? ???????????? ????????????
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
          <div className="scaleUpOnHover-125 cursor-pointer ">
            <CancelIcon width={18} height={18} stroke="#ccaa4b" />
          </div>
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
                <h4>????????? ??????</h4>
              </label>
              <input
                id="seriesName"
                type="text"
                className="h-10 w-full rounded-3xl px-4 text-lg text-black transition-all duration-500 focus:h-16 focus:border-2 focus:border-solid focus:border-Primary focus:outline-none md:h-16 md:text-xl md:focus:h-24"
                placeholder="????????? ??????"
                name="seriesName"
                onChange={onChangeInput}
              />
            </div>

            <div className="flex flex-col gap-5">
              <label htmlFor="seriesThumbPhoto" className="flex flex-col">
                <h4>????????? ????????? ??????</h4>
                {!inputState.thumbLocalFilePath && (
                  <div className="scaleUpOnHover-125 w-fit animate-pulse cursor-pointer">
                    <ImageIcon width={70} height={70} stroke="#ccaa4b" />
                  </div>
                )}
              </label>
              {inputState.thumbLocalFilePath && (
                <div className="scaleUpOnHover-125 w-fit animate-pulse overflow-auto rounded-3xl">
                  <Image
                    alt="???????????? ??????"
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
                className="hidden"
              />
            </div>
            <div className="flex flex-col gap-5">
              <label htmlFor="seriesPhoto" className="flex flex-col">
                <h4>?????? ??????</h4>
                {!inputState.localFilePath && (
                  <div className="scaleUpOnHover-125 w-fit animate-pulse cursor-pointer opacity-80">
                    <ImageIcon width={70} height={70} stroke="#ccaa4b" />
                  </div>
                )}
              </label>
              {inputState.localFilePath && (
                <div className="scaleUpOnHover-125 w-fit animate-pulse overflow-auto rounded-3xl">
                  <Image
                    alt="???????????? ??????"
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
                className="hidden"
              />
            </div>
          </form>
          <button
            type="submit"
            className={`box-border rounded-3xl p-5 text-lg text-Secondary ${
              processing ? "bg-gray-50 text-zinc-200" : "bg-Accent"
            }`}
            form="addSeriesForm"
            disabled={processing}
          >
            <p className="scaleUpOnHover-125">????????? ?????????</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSeriesModal;
