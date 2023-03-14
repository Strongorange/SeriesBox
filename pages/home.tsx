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
import RecentseriesItem from "../components/RecentSeriesItem";
import { InView } from "react-intersection-observer";

const Home = () => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [recentSeries, setRecentSeries] = useState<
    SeriesDocument[] | undefined
  >(undefined);

  const [isEditting, setIsEditting] = useState(false);
  const [recentSeriesIndex, setRecentSeriesIndex] = useState(0);
  const { user, isGuest } = useUserStore();
  const { setSeries, series: storeSeries, clearSeries } = useSeriesStore();
  const { showAddPhoto, setState } = useStateStore();

  const moveAndSetSeries = (docId: string, item?: SeriesDocument) => {
    if (!isEditting) {
      router.push(`/serieses/${docId}`);
      // 현재 1개의 객체만 들어있는 recentSeries Localstorage 를 배열로 변환
      const recentSeriesLocal: SeriesDocument[] = JSON.parse(
        String(localStorage.getItem("recentSeries"))
      );
      if (recentSeriesLocal.length > 8) {
        recentSeriesLocal.splice(4, 20);
      }

      const isItemExist = recentSeriesLocal.some(
        (ele: SeriesDocument) => ele.docId === item?.docId
      );
      if (isItemExist) {
        const existItemIndex = recentSeriesLocal.findIndex(
          (ele: SeriesDocument) => ele.docId === item?.docId
        );
        recentSeriesLocal.splice(existItemIndex, 1);
      }
      recentSeriesLocal.unshift(item!);
      localStorage.setItem("recentSeries", JSON.stringify(recentSeriesLocal));
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
      // isGuest 에 따라 컬렉션 변화
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
      // console.log("home 에서 유저 없음");
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
    // recentSeries Localstorage 에서 state 로 데이터 이동
    const isExist = localStorage.getItem("recentSeries");
    if (isExist !== null) {
      const data = JSON.parse(String(localStorage.getItem("recentSeries")));
      setRecentSeries(data);
    }
  }, []);

  useEffect(() => {
    // console.log(recentSeries);
  }, [recentSeries]);

  if (pageLoading) return <div></div>;

  return (
    <>
      <div className="flex w-full animate-fade-in flex-col gap-10 bg-Secondary p-PageLR pb-BottomPadding pt-[10vh] text-Primary">
        <div className="flex w-full flex-col gap-5">
          <h3>최근 사용한 시리즈</h3>
          {/**TODO: PC 에서는 List 로 8개 보여주기 */}
          <div className="flex w-full overflow-visible ">
            <div className="flex w-full gap-5 overflow-scroll p-7 pl-0">
              {recentSeries &&
                recentSeries.map((item: SeriesDocument, index: number) => (
                  <RecentseriesItem
                    seriesItem={item}
                    moveAndSetSeries={moveAndSetSeries}
                    key={index}
                    index={index}
                    setIndex={setRecentSeriesIndex}
                  />
                ))}
            </div>
          </div>
          <h4 className="-mt-10 self-center md:hidden">
            {recentSeries && `${recentSeriesIndex}/${recentSeries.length}`}
          </h4>
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full items-center justify-between">
            <h3>시리즈 목록</h3>
            <div
              className="scaleUpOnHover-125 cursor-pointer"
              onClick={toggleIsEditting}
            >
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
