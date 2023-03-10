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

  const { user, isGuest } = useUserStore();
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
    let unsubscribe: () => void;
    if (user) {
      clearSeries();
      //TODO: isGuest 에 따라 컬렉션 변화
      unsubscribe = onSnapshot(
        collection(db, !isGuest ? "series" : "seriesGuest"),
        (querySnapshot) => {
          clearSeries();
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
        }
      );
    } else {
      console.log("home 에서 유저 없음");
      router.push("/");
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
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
      <div className="flex w-full animate-fade-in flex-col gap-10 bg-Secondary p-PageLR pb-BottomPadding pt-[10vh] text-Primary">
        <div className="flex w-full flex-col gap-5">
          <h3>최근 사용한 시리즈</h3>
          {localStorage.getItem("recentSeries") && (
            <div className="flex w-full gap-[3vw] overflow-auto">
              {/** 최근 사용한 시리즈 */}
              <div
                className="box-border flex w-full gap-10 rounded-3xl bg-Primary p-5 text-white md:p-4"
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
                  <h4>
                    {recentSeries!.docId.length > 8
                      ? `${recentSeries?.docId.slice(0, 8)}...`
                      : recentSeries?.docId}
                  </h4>
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
        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full items-center justify-between">
            <h3>시리즈 목록</h3>
            <div className="cursor-pointer" onClick={toggleIsEditting}>
              {isEditting ? (
                <CheckIcon stroke="#ccaa4b" />
              ) : (
                <PenIcon fill="#ccaa4b" />
              )}
            </div>
          </div>

          <div className="grid w-full grid-cols-3 gap-1 md:grid-cols-5 md:gap-3 lg:grid-cols-7 lg:gap-5">
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
