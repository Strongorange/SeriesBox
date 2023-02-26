import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SeriesDocument } from "../stores/seriesStore";
import { doc, deleteDoc } from "firebase/firestore";
import { deleteObject, listAll, ref } from "firebase/storage";
import { storage } from "../firebase";
import { db } from "../firebase";
import TrashIcon from "./svgs/TrashIcon";
import YesNoDialog from "./modals/YesNoDialog";

interface SeriesItemProps {
  docId: string;
  data?: SeriesDocument[];
  docPhotoUrl?: string;
  onClick: () => void;
  isShow?: boolean;

  isEditting: boolean;
}

const SeriesIem = (props: SeriesItemProps) => {
  const { docId, docPhotoUrl, onClick, isShow, isEditting } = props;
  const [showYesNoDialog, setShowYesNoDialog] = useState(false);

  const deleteFromFB = async (willDeleteDocId: string) => {
    try {
      if (willDeleteDocId) {
        //TODO: Firestore 도큐먼트 삭제
        await deleteDoc(doc(db, "series", willDeleteDocId));
        //TODO: 스토리지에서 폴더 삭제
        //
        const path = `${willDeleteDocId}/`;
        console.log(path);
        const directoryRef = ref(storage, path);
        // 디렉토리 안의 모든 아이템 지우기
        const result = await listAll(directoryRef);
        await Promise.all(result.items.map((fileRef) => deleteObject(fileRef)));
        console.log("삭제 성공");
        // 디렉토리 지우기
        // await deleteObject(directoryRef);
        // 디렉토리는 디렉토리 안의 내용물이 없으니 지워졌음

        //TODO: 시각적으로 경과 표시해주기
        //
        //TODO: 모달 창 닫고 화면 리프레쉬
        //
        toggleIsShow();
      }
    } catch (error) {}
  };

  const toggleIsShow = () => {
    setShowYesNoDialog((prev) => !prev);
  };

  useEffect(() => {
    if (showYesNoDialog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showYesNoDialog]);

  return (
    <>
      <div
        className={`flexCenter flex-col w-full relative ${
          isShow ? "animate-fade-in-photo" : "hidden"
        }`}
        onClick={onClick}
      >
        {docPhotoUrl && (
          <div className="w-full aspect-square relative">
            <Image
              src={docPhotoUrl}
              alt="docPhotoUrl"
              fill
              priority={true}
              loading="eager"
              sizes="33vw"
              placeholder="blur"
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
            />
          </div>
        )}
        {docId && <p className="text-[1.4rem] font-medium">{docId}</p>}
        {isEditting && (
          <div
            className="absolute top-0 right-1 bg-red-400 p-2 rounded-2xl animate-pulse"
            onClick={toggleIsShow}
          >
            <TrashIcon stroke="#ffffff" />
          </div>
        )}
      </div>
      <YesNoDialog
        isShow={showYesNoDialog}
        toggleIsShow={toggleIsShow}
        documentId={docId}
        deleteFromFB={deleteFromFB}
      />
    </>

  );
};

export default SeriesIem;
