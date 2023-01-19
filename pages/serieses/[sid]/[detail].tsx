import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FavoritesIcon from "../../../components/svgs/FavoritesIcon";
import MessageIcon from "../../../components/svgs/MessageIcon";

export interface LocalStorageFavoriteItem {
  fileName: string;
  fileUrl: string;
  series: string;
}

const PhotoDetail = () => {
  const router = useRouter();
  const { name, url, sid } = router.query;
  const [isClicked, setIsClicked] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [fileUrl, setFileUrl] = useState(String(url));
  const [loading, setLoading] = useState(true);

  const toggleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  const handleShare = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    //FIXME: 공유기능 구현하기, 웹 에서는 https 에서만 동작하고 웹뷰에서는 동작하지 않는다 함
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
    if (router.isReady) {
      setFileUrl(router.query.url as string);
      setLoading(false);
    }
  }, [router.isReady]);

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
    } else {
      localStorage.setItem("favorite", "[]");
      setIsFavorite(false);
    }
  }, []);

  useEffect(() => {
    if (isFavorite) {
      const favorite = localStorage.getItem("favorite");
      if (!favorite) {
        localStorage.setItem(
          "favorite",
          JSON.stringify([{ fileName: name, fileUrl: url, series: sid }])
        );
      } else {
        const localStorageFavorite = localStorage.getItem("favorite");
        const data = JSON.parse(localStorageFavorite!);
        const newData = [
          ...data,
          { fileName: name, fileUrl: url, series: sid },
        ];
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
    <div className="w-full flex h-[93vh] flex-col bg-black animate-fade-in">
      {!loading && (
        <div className="w-full h-[100%] relative" onClick={toggleIsClicked}>
          <Image
            alt="사진"
            src={fileUrl}
            fill
            style={{ objectFit: "contain" }}
          />
          <div
            className={`flex absolute top-0 justify w-full items-center justify-end gap-6 p-PageLR text-white ${
              isClicked ? "animate-fade-in" : "animate-fade-out"
            } `}
          >
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
        </div>
      )}
    </div>
  );
};

export default PhotoDetail;
