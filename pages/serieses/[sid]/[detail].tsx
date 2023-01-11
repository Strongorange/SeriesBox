import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FavoritesIcon from "../../../components/svgs/FavoritesIcon";
import MessageIcon from "../../../components/svgs/MessageIcon";

const PhotoDetail = () => {
  const router = useRouter();
  const { name, url } = router.query;
  const [isClicked, setIsClicked] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  const toggleIsFavorite = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="w-full flex h-[93vh] flex-col bg-black">
      <div className="w-full h-[100%] relative" onClick={toggleIsClicked}>
        <Image
          alt="사진"
          src={String(url)}
          fill
          style={{ objectFit: "contain" }}
        />
        {isClicked && (
          <div className="flex absolute top-0 justify w-full items-center justify-end gap-6 p-PageLR text-white">
            <div onClick={(e) => toggleIsFavorite(e)}>
              <FavoritesIcon
                width={30}
                height={30}
                fill={isFavorite ? "#ff5c00" : "#aaaaaa"}
              />
            </div>
            <MessageIcon fill="#ffffff" width={30} height={30} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoDetail;
