import React, { useEffect, useState } from "react";
import {
  SeriesDocument,
  SeriesItem,
  useSeriesStore,
} from "../../../stores/seriesStore";
import Image from "next/image";
import { useRouter } from "next/router";

const SeriesDetail = () => {
  const router = useRouter();
  const sid = router.query.sid;
  const { series } = useSeriesStore();
  const [data, setData] = useState<SeriesItem[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const moveToDetail = (item: SeriesItem) => {
    //TODO: 사진 클릭하면 크게보기, 디테일 화면으로 넘어가기
    console.log(item);
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
    <div className="grid grid-cols-3 w-full gap-1 p-PageLR animate-fade-in">
      {data &&
        data.map((item: SeriesItem, index: number) => (
          <div
            key={index}
            className="flexCenter flex-col w-full relative aspect-square"
            onClick={() => moveToDetail(item)}
          >
            <div className="w-full h-full relative">
              <Image alt="" src={item.fileUrl} fill />
            </div>
            {/* <span>{item.fileName}</span> */}
          </div>
        ))}
    </div>
  );
};

export default SeriesDetail;
