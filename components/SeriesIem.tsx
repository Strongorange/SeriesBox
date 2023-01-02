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
  const { docId, docPhotoUrl, data, onClick } = props;
  return (
    <div className="flexCenter flex-col" onClick={onClick}>
      {docPhotoUrl && (
        <Image src={docPhotoUrl} alt="docPhotoUrl" width={100} height={100} />
      )}
      {docId && <p>{docId}</p>}
    </div>
  );
};

export default SeriesIem;
