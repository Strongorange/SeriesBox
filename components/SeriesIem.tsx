import Image from "next/image";
import React from "react";
import { SeriesDocument } from "../stores/seriesStore";

interface SeriesItemProps {
  docId: string;
  data?: SeriesDocument[];
  docPhotoUrl?: string;
  onClick: () => void;
}

const SeriesIem = (props: SeriesItemProps) => {
  const { docId, docPhotoUrl, onClick } = props;
  return (
    <div className="flexCenter flex-col w-full" onClick={onClick}>
      {docPhotoUrl && (
        <div className="w-full aspect-square relative">
          <Image src={docPhotoUrl} alt="docPhotoUrl" quality={100} fill />
        </div>
      )}
      {docId && <p>{docId}</p>}
    </div>
  );
};

export default SeriesIem;
