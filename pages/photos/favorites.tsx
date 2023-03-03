import React, { useEffect, useState } from "react";
import { LocalStorageFavoriteItem } from "../serieses/[sid]/[detail]";
import Image from "next/image";
import { useRouter } from "next/router";

const Favorites = () => {
  const router = useRouter();
  const [localFavorites, setLocalFavorites] = useState([]);

  const gotoDetail = (item: LocalStorageFavoriteItem) => {
    //디테일 페이지로
    router.push({
      pathname: `/serieses/${item.series}/${item.fileName}`,
      query: { name: item.fileName, url: item.fileUrl },
    });
  };

  useEffect(() => {
    const favorite = localStorage.getItem("favorite");
    if (favorite) {
      setLocalFavorites(JSON.parse(favorite));
    }
  }, []);

  return (
    <div className="flex flex-col w-full p-PageLR bg-Secondary">
      <h2>즐겨찾는 사진들</h2>

      <div className="grid grid-cols-3 gap-1 w-full">
        {localFavorites ? (
          localFavorites.map(
            (item: LocalStorageFavoriteItem, index: number) => (
              <div
                key={index}
                className="w-full aspect-square relative"
                onClick={() => gotoDetail(item)}
              >
                <Image src={item.fileUrl} alt="" fill />{" "}
              </div>
            )
          )
        ) : (
          <span>즐겨찾는 사진이 없어요!</span>
        )}
      </div>
    </div>
  );
};

export default Favorites;
