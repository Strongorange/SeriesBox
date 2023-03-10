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
    // 컴포넌트 로드시 localStorage 의  favorites 에서 데이터를 가져옴
    const favorite = localStorage.getItem("favoriteItems");
    if (favorite) {
      setLocalFavorites(JSON.parse(favorite));
    }
  }, []);

  return (
    <div className="flex w-full flex-col gap-8 bg-Secondary p-PageLR pt-[10vh] text-Primary">
      <h4>즐겨찾는 사진들</h4>
      <div className="grid w-full grid-cols-3 gap-1 md:grid-cols-5 lg:grid-cols-7">
        {localFavorites ? (
          localFavorites.map(
            (item: LocalStorageFavoriteItem, index: number) => (
              <div
                key={index}
                className="scaleUpOnHover-125 relative aspect-square w-full cursor-pointer overflow-auto rounded-3xl"
                onClick={() => gotoDetail(item)}
              >
                <Image src={item.fileUrl} alt="" fill />
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
