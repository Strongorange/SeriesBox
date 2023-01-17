import Image from "next/image";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import FavoritesIcon from "../../../components/svgs/FavoritesIcon";
import MessageIcon from "../../../components/svgs/MessageIcon";

interface LocalStorageFavoriteItem {
  fileName: string;
  fileUrl: string;
}

const PhotoDetail = () => {
  const router = useRouter();
  const { name, url } = router.query;
  const [isClicked, setIsClicked] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  const handleShare = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    //FIXME: 공유기능 구현하기
    if (navigator.share) {
      navigator.share({
        title: "사진 공유",
        text: "사진 공유",
        url: String(url),
      });
    }
  };

  const toggleIsFavorite = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const favorite = localStorage.getItem("favorite");
    if (favorite) {
      const data = JSON.parse(favorite);
      const isFavorite = data.find(
        (item: LocalStorageFavoriteItem) => item.fileName === name
      );
      if (isFavorite) {
        setIsFavorite(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isFavorite) {
      const favorite = localStorage.getItem("favorite");
      if (!favorite) {
        localStorage.setItem(
          "favorite",
          JSON.stringify([{ fileName: name, fileUrl: url }])
        );
      } else {
        const localStorageFavorite = localStorage.getItem("favorite");
        const data = JSON.parse(localStorageFavorite!);
        const newData = [...data, { fileName: name, fileUrl: url }];
        localStorage.setItem("favorite", JSON.stringify(newData));
      }
    } else {
      const localStorageFavorite = localStorage.getItem("favorite");
      const data = JSON.parse(localStorageFavorite!);
      const newData = data.filter(
        (item: LocalStorageFavoriteItem) => item.fileName !== name
      );
      localStorage.setItem("favorite", JSON.stringify(newData));
    }
  }, [isFavorite]);

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
            <div onClick={(e) => handleShare(e)}>
              <MessageIcon fill="#ffffff" width={30} height={30} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoDetail;
