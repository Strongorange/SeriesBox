import React, { useEffect, useState } from "react";
import { useUserStore } from "../stores/userStore";
import { useSeriesStore } from "../stores/seriesStore";
import { useRouter } from "next/router";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { SeriesDocument } from "../stores/seriesStore";
import SeriesIem from "../components/SeriesIem";
import AddSeriesModal from "../components/modals/AddSeriesModal";
import { useStateStore } from "../stores/stateStore";
import PenIcon from "../components/svgs/Pen";
import CheckIcon from "../components/svgs/CheckIcon";

const Home = () => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);
  const [animationIndex, setAnimationIndex] = useState(0);

  const [isEditting, setIsEditting] = useState(false);

  const { user } = useUserStore();
  const { setSeries, series: storeSeries, clearSeries } = useSeriesStore();
  const { showAddPhoto, setState } = useStateStore();

  const moveAndSetSeries = (docId: string) => {
    if (!isEditting) {
      router.push(`/serieses/${docId}`);
      localStorage.setItem("recentSeries", docId);
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

          //TODO: 어레이에 있는지 검증해서 어레이에 docid 가 없는 경우에만 넣기
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

  useEffect(() => {
    console.log(storeSeries);
  }, [storeSeries]);

  if (pageLoading) return <div></div>;

  return (
    <>
      <div className="flex flex-col w-full p-PageLR animate-fade-in gap-10 pb-BottomPadding">
        <div className="w-full flex flex-col gap-5">
          <h2>최근 사용한 시리즈</h2>
          {localStorage.getItem("recentSeries") && (
            <div className="w-full flex overflow-auto gap-[3vw]">
              {/** 최근 사용한 시리즈 */}
              <div className=" min-w-[20vw] min-h-[5vh] flexCenter bg-amber-100 rounded-3xl p-5">
                <h4>{localStorage.getItem("recentSeries")}</h4>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex justify-between items-center">
            <h2>시리즈 목록</h2>
            <div className="cursor-pointer" onClick={toggleIsEditting}>
              {isEditting ? <CheckIcon /> : <PenIcon />}
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-1 w-full">
            {storeSeries &&
              storeSeries.map((item: SeriesDocument, index: number) => (
                <SeriesIem
                  onClick={() => moveAndSetSeries(item.docId)}
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
