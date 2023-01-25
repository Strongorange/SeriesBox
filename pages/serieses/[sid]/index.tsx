import React, { useEffect, useState } from "react";
import {
  SeriesDocument,
  SeriesItem,
  useSeriesStore,
} from "../../../stores/seriesStore";
import Image from "next/image";
import { useRouter } from "next/router";
import LoadingIcon from "../../../components/svgs/Loading";

const SeriesDetail = () => {
  const router = useRouter();
  const sid = router.query.sid;
  const { series } = useSeriesStore();
  const [data, setData] = useState<SeriesItem[]>();
  const [showLoader, setShowLoader] = useState(false);

  const moveToDetail = (item: SeriesItem) => {
    //TODO: 사진 클릭하면 크게보기, 디테일 화면으로 넘어가기
    setShowLoader(true);
    router.push({
      pathname: `/serieses/${sid}/${item.fileName}`,
      query: { name: item.fileName, url: item.fileUrl },
    });
  };

  useEffect(() => {
    if (series) {
      const temp = series.filter((item: SeriesDocument) => item.docId === sid);
      // console.log("업데이트된 temp");
      // console.log(temp);
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

  if (!data) return <div>로딩중</div>;

  return (
    <>
      {showLoader && (
        <div className="w-full fixed top-0 flexCenter h-screen bg-gray-600 opacity-70 z-[200]">
          <div className="animate-spin">
            <LoadingIcon height={40} width={40} stroke="#ffe5d6" />
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 w-full gap-1 p-PageLR animate-fade-in pb-[9vh]">
        {data &&
          data.map((item: SeriesItem, index: number) => (
            <div
              key={index}
              className="flexCenter flex-col w-full relative aspect-square"
              onClick={() => moveToDetail(item)}
            >
              {item.fileName.includes("mp4") ? (
                <video
                  src={item.fileUrl}
                  className="w-full h-full object-fill"
                  autoPlay
                  muted
                  loop
                />
              ) : (
                <div className="w-full h-full relative">
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
            </div>
          ))}
      </div>
    </>
  );
};

export default SeriesDetail;
