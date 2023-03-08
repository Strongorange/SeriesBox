import React, { useEffect, useState } from "react";
import {
  SeriesDocument,
  SeriesItem,
  useSeriesStore,
} from "../../../stores/seriesStore";
import Image from "next/image";
import { useRouter } from "next/router";
import LoadingIcon from "../../../components/svgs/Loading";
import PenIcon from "../../../components/svgs/Pen";
import CheckIcon from "../../../components/svgs/CheckIcon";
import { db, storage } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import SelectingBottomNav from "../../../components/SelectingBottomNav";
import YesNoDialogItem from "../../../components/modals/YesNoDialogItem";
import { useUserStore } from "../../../stores/userStore";

const SeriesDetail = () => {
  const router = useRouter();
  const sid = router.query.sid;
  const { series } = useSeriesStore();
  const { isGuest } = useUserStore();
  const [data, setData] = useState<SeriesItem[]>();
  const [showLoader, setShowLoader] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [isEditting, setIsEditting] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const toggleShowDialog = () => {
    setShowDialog((prev) => !prev);
  };

  const toggleSelected = (
    index: number,
    e?: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e) {
      e.stopPropagation();
    }
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems((prev) => [...prev, index]);
    }
  };

  const deleteMedia = async () => {
    const seriesRef = doc(
      db,
      !isGuest ? `series/${sid}` : `seriesGuest/${sid}`
    );
    // 지우기 전 현재 "data" Arr 을 가져옴
    const docSnap = await getDoc(seriesRef);
    const dataOfSnap = docSnap.data()!.data!;
    // 업데이트 할 데이터
    const newData = dataOfSnap!.filter(
      (_: SeriesItem, index: number) => !selectedItems.includes(index)
    );

    // selectedItems 에 존재하는 인덱스에서 fileName 을 가져와 스토리지에서 삭제
    for (let i of selectedItems) {
      console.log(i);
      const fileRef = ref(storage, `${sid}/${dataOfSnap[i].fileName}`);
      console.log("fileRef");
      console.log(fileRef);
      await deleteObject(fileRef);
    }
    // firestore 업데이트
    await updateDoc(seriesRef, { data: newData });
    // 삭제 후 초기화 작업
    setData(newData);
    setShowDialog(false);
    toggleIsEditting();
    setSelectedItems([]);
  };

  const moveToDetailOrSelect = (item: SeriesItem, index: number) => {
    if (!isEditting) {
      setShowLoader(true);
      router.push({
        pathname: `/serieses/${sid}/${item.fileName}`,
        query: { name: item.fileName, url: item.fileUrl },
      });
    } else {
      toggleSelected(index);
    }
  };

  const toggleIsEditting = () => {
    setIsEditting((prev) => !prev);
    setSelectedItems([]);
  };

  useEffect(() => {
    if (series) {
      const temp = series.filter((item: SeriesDocument) => item.docId === sid);
      if (temp.length > 0) {
        setData(temp[temp.length - 1].data);
        localStorage.setItem(
          "series",
          JSON.stringify(temp[temp.length - 1].data)
        );
      }
    }

    return () => {
      setShowLoader(false);
    };
  }, [series, sid]);

  useEffect(() => {
    if (data) localStorage.setItem("series", JSON.stringify(data));

    if (!data) {
      const temp = JSON.parse(localStorage.getItem("series") || "[]");
      setData(temp);
    }
  }, [data]);

  // 한개씩 나타나는 애니메이션
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (data) {
      if (data.length > 0) {
        intervalId = setInterval(() => {
          if (animationIndex === data.length - 1) {
            clearInterval(intervalId);
          } else {
            setAnimationIndex((index) => (index + 1) % data.length);
          }
        }, 60);
      }
    }
    return () => clearInterval(intervalId);
  }, [data, animationIndex]);

  // SelectedItems 추적, 삭제기능
  useEffect(() => {
    // console.log("SelectedItems");
    // console.log(selectedItems);
  }, [selectedItems]);

  if (!data) return <div>로딩중</div>;

  return (
    <>
      {showLoader && (
        <div className="flexCenter fixed top-0 z-[200] h-screen w-full bg-gray-600 opacity-70 ">
          <div className="rotate-180 animate-spin">
            <LoadingIcon height={40} width={40} stroke="#ffe5d6" />
          </div>
        </div>
      )}
      <div className="flex w-full flex-col bg-Secondary pt-[7vh] text-Primary ">
        <div className="flex w-full items-center justify-between p-PageLR ">
          <h4>{data.length} 개의 미디어</h4>
          <div onClick={toggleIsEditting}>
            {isEditting ? (
              <CheckIcon stroke="#ccaa4b" />
            ) : (
              <PenIcon fill="#ccaa4b" />
            )}
          </div>
        </div>
        <div className="grid w-full animate-fade-in grid-cols-3 gap-1 p-PageLR pb-[9vh] md:grid-cols-5 md:gap-3 lg:gap-5">
          {data &&
            data.map((item: SeriesItem, index: number) => (
              <div
                key={index}
                className={`flexCenter relative aspect-square w-full flex-col overflow-auto rounded-3xl ${
                  index <= animationIndex ? "animate-fade-in" : "hidden"
                }`}
                onClick={() => moveToDetailOrSelect(item, index)}
              >
                {item.fileName.includes("mp4") ? (
                  <video
                    src={item.fileUrl}
                    className="h-full w-full object-fill"
                    autoPlay
                    muted
                    loop
                  />
                ) : (
                  <div className="relative h-full w-full">
                    <Image
                      alt=""
                      src={item.fileUrl}
                      fill
                      priority={true}
                      sizes="33vw"
                      placeholder="blur"
                      blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                    />
                  </div>
                )}
                {isEditting && (
                  <div
                    className={`absolute top-2 right-2 h-[15%] w-[15%] animate-pulse rounded-full border-2 border-Accent ${
                      selectedItems.includes(index) ? "bg-Accent" : null
                    }`}
                    onClick={(e) => toggleSelected(index, e)}
                  />
                )}
              </div>
            ))}
        </div>

        <SelectingBottomNav
          isShow={selectedItems.length > 0 && isEditting}
          isEditting={isEditting}
          toggleShowDialog={toggleShowDialog}
        />

        <YesNoDialogItem
          isShow={showDialog}
          isEditting={isEditting}
          toggleIsShow={toggleShowDialog}
          deleteFunc={deleteMedia}
        />
      </div>
    </>
  );
};

export default SeriesDetail;
