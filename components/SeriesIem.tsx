import Image from "next/image";
import React from "react";
import { SeriesDocument } from "../stores/seriesStore";

interface SeriesItemProps {
  docId: string;
  data?: SeriesDocument[];
  docPhotoUrl?: string;
  onClick: () => void;
  isShow?: boolean;
}

const SeriesIem = (props: SeriesItemProps) => {
  const { docId, docPhotoUrl, onClick, isShow } = props;
  return (
    <div
      className={`flexCenter flex-col w-full ${
        isShow ? "animate-fade-in" : "hidden"
      }`}
      onClick={onClick}
    >
      {docPhotoUrl && (
        <div className="w-full aspect-square relative">
          <Image
            src={docPhotoUrl}
            alt="docPhotoUrl"
            fill
            priority={true}
            loading="eager"
            sizes="33vw"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
          />
        </div>
      )}
      {docId && <p className="text-[1.4rem] font-medium">{docId}</p>}
    </div>
  );
};

export default SeriesIem;
