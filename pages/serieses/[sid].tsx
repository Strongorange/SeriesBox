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
    if (series) {
      const temp = series.filter(
        (item: SeriesDocument, index: number) => item.docId === sid
      );
      const noDupli = temp.filter(
        (item: any, index: any) => temp.indexOf(item) === index
      );
      console.log("중복제거");
      console.log(noDupli);
      setData(noDupli[0].data);
    } else {
      null;
    }
  }, []);

  useEffect(() => {
    console.log("진짜 쓸 데이터");
    console.log(data);
  }, [data]);

  if (!data) return <div>로딩중</div>;

  return (
    <div className="grid grid-cols-3 w-full p-PageLR">
      {data &&
        data.map((item: SeriesItem, index: number) => (
          <div key={index}>
            <Image alt="" src={item.fileUrl} width={100} height={100} />
          </div>
        ))}
    </div>
  );
};

export default SeriesDetail;
