import React, { useEffect } from "react";
import SeriesIem from "./SeriesIem";
import { SeriesDocument } from "../stores/seriesStore";
import ImageIcon from "./svgs/ImageIcon";
import { useInView } from "react-intersection-observer";

interface RecentSeriesItemI {
  seriesItem: SeriesDocument;
  moveAndSetSeries: (docId: string, item?: SeriesDocument) => void;
  index: number;
  setIndex: (index: number) => void;
}

const RecentseriesItem = (props: RecentSeriesItemI) => {
  const { seriesItem, moveAndSetSeries, index, setIndex } = props;
  const { ref, inView, entry } = useInView({ threshold: 0.8 });

  useEffect(() => {
    setIndex(index + 1);
  }, [inView, index]);

  return (
    <div
      ref={ref}
      className="md:hover:scaleUpOnHover-110 box-border flex min-w-[90vw] gap-10 rounded-3xl bg-Primary p-5 text-white md:w-1/5 md:min-w-[15vw] md:gap-0 md:bg-transparent md:p-0"
      onClick={() => moveAndSetSeries(String(seriesItem?.docId), seriesItem)}
    >
      <div className="flex w-full gap-5 md:relative md:gap-0">
        <div className="aspect-square w-1/2  md:w-full ">
          <SeriesIem
            isShow={true}
            docId=""
            docPhotoUrl={seriesItem?.docPhotoUrl}
            onClick={() =>
              moveAndSetSeries(String(seriesItem?.docId), seriesItem)
            }
            isEditting={false}
            blockTransformOnHOver={true}
          />
        </div>
        <div className="md flex flex-col gap-3 md:absolute md:bottom-0 md:left-1/2 md:w-full md:-translate-x-1/2 md:items-center md:justify-center md:gap-1 md:rounded-3xl md:bg-black md:bg-opacity-30 md:p-3">
          <h4>
            {seriesItem!.docId.length > 8
              ? `${seriesItem?.docId.slice(0, 8)}...`
              : seriesItem?.docId}
          </h4>
          <div className="flex items-center gap-3">
            <ImageIcon fill="#ffffff" />
            <span className="text-xl">
              {seriesItem?.data.length} 개의 미디어
            </span>
          </div>

          <span className="text-lg">시리즈 보러가기 {`>>`}</span>
        </div>
      </div>
    </div>
  );
};

export default RecentseriesItem;
