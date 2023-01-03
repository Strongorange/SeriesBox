import React, { useEffect, useState } from "react";
import {
  SeriesDocument,
  SeriesItem,
  useSeriesStore,
} from "../../stores/seriesStore";
import Image from "next/image";
import { useRouter } from "next/router";

const SeriesDetail = () => {
  const router = useRouter();
  const sid = router.query.sid;
  const { series } = useSeriesStore();
  const [data, setData] = useState<SeriesItem[]>();

  useEffect(() => {
    console.log("어ㅂ데이트");
    if (series) {
      const temp = series.filter((item: SeriesDocument) => item.docId === sid);
      console.log("업데이트된 temp");
      console.log(temp);
      setData(temp[temp.length - 1].data);
    } else {
      null;
    }
  }, [series, sid]);

  if (!data) return <div>로딩중</div>;

  return (
    <div className="grid grid-cols-3 w-full p-PageLR">
      {data &&
        data.map((item: SeriesItem, index: number) => (
          <div key={index} className="flexCenter flex-col w-full relative ">
            <div className="w-full h-[33vw] relative">
              <Image alt="" src={item.fileUrl} fill />
            </div>
            {/* <span>{item.fileName}</span> */}
          </div>
        ))}
    </div>
  );
};

export default SeriesDetail;
