import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const PhotoDetail = () => {
  const router = useRouter();
  const { name, url } = router.query;

  console.log(url);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full aspect-[4/3] relative">
        <Image alt="" src={String(url)} fill />
      </div>
      <div>
        <h4>이름 : {String(name)}</h4>
      </div>
    </div>
  );
};

export default PhotoDetail;
