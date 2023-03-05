import React, { use, useEffect, useState } from "react";
import { useUserStore } from "../stores/userStore";
import { SeriesItem, useSeriesStore } from "../stores/seriesStore";
import { useRouter } from "next/router";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { SeriesDocument } from "../stores/seriesStore";
import SeriesIem from "../components/SeriesIem";
import AddSeriesModal from "../components/modals/AddSeriesModal";
import { useStateStore } from "../stores/stateStore";
import PenIcon from "../components/svgs/Pen";
import CheckIcon from "../components/svgs/CheckIcon";
import ImageIcon from "../components/svgs/ImageIcon";

const Home = () => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [recentSeries, setRecentSeries] = useState<SeriesDocument | undefined>(
    undefined
  );

  const [isEditting, setIsEditting] = useState(false);

  const { user } = useUserStore();
  const { setSeries, series: storeSeries, clearSeries } = useSeriesStore();
  const { showAddPhoto, setState } = useStateStore();

  const moveAndSetSeries = (docId: string, item?: SeriesDocument) => {
    if (!isEditting) {
      router.push(`/serieses/${docId}`);
      localStorage.setItem("recentSeries", JSON.stringify(item));
    } else {
      return;
    }
  };

  const toggleIsEditting = () => {
    setIsEditting((prev) => !prev);
  };

  useEffect(() => {
    if (user) {
      clearSeries();

      onSnapshot(collection(db, "series"), (querySnapshot) => {
        clearSeries();
        console.log(`querysnapshot.docs 길이 = ${querySnapshot.docs.length}`);
        querySnapshot.docs.forEach((queryDocumentSnapshot, index) => {
          const tempData: SeriesDocument = {
            docId: queryDocumentSnapshot.id,
            data: queryDocumentSnapshot.data().data,
            docPhotoUrl: queryDocumentSnapshot.data().docPhotoUrl,
          };

          setSeries(tempData);
        });

        if (storeSeries) {
          setPageLoading(false);
        }
      });
    } else {
      console.log("home 에서 유저 없음");
      router.push("/");
    }
  }, []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (storeSeries.length > 0) {
      intervalId = setInterval(() => {
        if (animationIndex === storeSeries.length - 1) {
          clearInterval(intervalId);
        } else {
          setAnimationIndex((index) => (index + 1) % storeSeries.length);
        }
      }, 60);
    }

    return () => clearInterval(intervalId);
  }, [storeSeries, animationIndex]);

  useEffect(() => {
    // 모달 스크롤 방지를 위한 코드
    if (showAddPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showAddPhoto]);

  // 최근 시리즈 추적
  useEffect(() => {
    if (localStorage.getItem("recentSeries")) {
      setRecentSeries(JSON.parse(String(localStorage.getItem("recentSeries"))));
    }
  }, []);

  useEffect(() => {
    console.log(storeSeries);
  }, [storeSeries]);

  if (pageLoading) return <div></div>;

  return (
    <>
      <div className="flex flex-col w-full p-PageLR animate-fade-in gap-10 pb-BottomPadding bg-Secondary text-Primary pt-[7vh]">
        <div className="w-full flex flex-col gap-5">
          <h2>최근 사용한 시리즈</h2>
          {localStorage.getItem("recentSeries") && (
            <div className="w-full flex overflow-auto gap-[3vw]">
              {/** 최근 사용한 시리즈 */}
              <div
                className="w-full rounded-3xl flex bg-green p-5 md:p-4 box-border gap-10 bg-Primary text-white"
                onClick={() =>
                  recentSeries &&
                  moveAndSetSeries(String(recentSeries?.docId), recentSeries)
                }
              >
                <div className="w-[30%] md:w-[15%]">
                  <SeriesIem
                    isShow={true}
                    docId=""
                    docPhotoUrl={recentSeries?.docPhotoUrl}
                    onClick={() =>
                      moveAndSetSeries(
                        String(recentSeries?.docId),
                        recentSeries
                      )
                    }
                    isEditting={false}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h3>{recentSeries?.docId}</h3>
                  <div className="flex items-center gap-3">
                    <ImageIcon fill="#ffffff" />
                    <span className="text-xl">
                      {recentSeries?.data.length} 개의 미디어
                    </span>
                  </div>

                  <span className="text-lg">시리즈 보러가기 {`>>`}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex justify-between items-center">
            <h2>시리즈 목록</h2>
            <div className="cursor-pointer" onClick={toggleIsEditting}>
              {isEditting ? (
                <CheckIcon stroke="#ccaa4b" />
              ) : (
                <PenIcon fill="#ccaa4b" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-1 md:gap-3 lg:gap-5 w-full">
            {storeSeries &&
              storeSeries.map((item: SeriesDocument, index: number) => (
                <SeriesIem
                  onClick={() => moveAndSetSeries(item.docId, item)}
                  key={index}
                  docId={item.docId}
                  docPhotoUrl={item.docPhotoUrl}
                  isShow={index <= animationIndex}
                  isEditting={isEditting}
                />
              ))}
          </div>
        </div>
      </div>
      <AddSeriesModal
        isShow={showAddPhoto}
        toggleShow={() => setState("showAddPhoto", false)}
      />
    </>
  );
};

export default Home;
