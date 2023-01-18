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

const Home = () => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);
  const { user } = useUserStore();
  const { setSeries, series: storeSeries, clearSeries } = useSeriesStore();
  const { showAddPhoto, setState } = useStateStore();

  const moveAndSetSeries = (docId: string) => {
    router.push(`/serieses/${docId}`);
    localStorage.setItem("recentSeries", docId);
  };

  useEffect(() => {
    if (user) {
      clearSeries();

      onSnapshot(collection(db, "series"), (querySnapshot) => {
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

  if (pageLoading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <>
      <div className="flex flex-col w-full p-PageLR animate-fade-in ">
        <h2>최근 사용한 시리즈</h2>
        {localStorage.getItem("recentSeries") && (
          <div className="w-full flex overflow-auto gap-[3vw]">
            <div className="w-[20vw] h-[5vh] flexCenter bg-amber-100 rounded-3xl">
              <h4>{localStorage.getItem("recentSeries")}</h4>
            </div>
          </div>
        )}
        <div className="flex flex-col"></div>
        <h2>시리즈 목록</h2>
        <div className="grid grid-cols-3 gap-1 w-full">
          {storeSeries &&
            storeSeries.map((item: SeriesDocument, index: number) => (
              <SeriesIem
                onClick={() => moveAndSetSeries(item.docId)}
                key={index}
                docId={item.docId}
                docPhotoUrl={item.docPhotoUrl}
              />
            ))}
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
