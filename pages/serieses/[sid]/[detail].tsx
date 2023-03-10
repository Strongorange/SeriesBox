import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useStateStore } from "../../../stores/stateStore";
import FavoritesIcon from "../../../components/svgs/FavoritesIcon";
import MessageIcon from "../../../components/svgs/MessageIcon";
import { GetServerSideProps, NextPage } from "next";
import { fileTypeFromStream } from "file-type";

export interface LocalStorageFavoriteItem {
  fileName: string;
  fileUrl: string;
  series: string;
}

interface IServerSideProps {
  fileType: string;
  sid: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("서버 파람");
  console.log(context.params);
  console.log("서버 쿼리");
  console.log(context.query);
  const { url } = context.query;
  const file = await fetch(String(url));
  // @ts-ignore
  const fileType = await fileTypeFromStream(file.body!);
  console.log(fileType);

  return {
    props: { fileType: fileType?.mime },
  };
};

const PhotoDetail: NextPage<IServerSideProps> = ({ fileType }) => {
  const router = useRouter();
  const { name, url, sid } = router.query;
  const { setShowBottomNav } = useStateStore();
  const [isClicked, setIsClicked] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState<
    LocalStorageFavoriteItem[] | []
  >([]);
  const [currentData, setCurrentData] =
    useState<LocalStorageFavoriteItem | null>(null);
  const [fileUrl, setFileUrl] = useState(String(url));
  const [loading, setLoading] = useState(true);

  const toggleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  const handleShare = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    // 카카오 공유 기능
    try {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: sid,
          description: `${sid} 시리즈`,
          imageUrl: url,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      });
    } catch (e) {
      console.log(e);
      alert("카카오 공유 오류가 발생했습니다");
    }
  };

  const toggleIsFavorite = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  useEffect(() => {
    console.log(fileType);
    if (router.isReady) {
      setFileUrl(router.query.url as string);
      setLoading(false);
      setShowBottomNav(false);
    }

    return () => {
      setShowBottomNav(true);
    };
  }, [router.isReady]);

  useEffect(() => {
    try {
      // 1. isFavorite 가 true 이면 아래 useEffect 에서 저장된 favoriteItems 상태에 현재 데이터를 추가
      if (isFavorite) {
        const isDataExist = favoriteItems.some(
          (item: LocalStorageFavoriteItem) =>
            item.fileUrl === currentData!.fileUrl
        );
        // 1-1 동일한 데이터가 있다면 아무것도 하지 않음
        if (isDataExist) {
          //
        } else {
          // 1-2 동일한 데이터가 없다면 데이터 추가
          setFavoriteItems((prev: LocalStorageFavoriteItem[]) => [
            ...prev,
            {
              fileName: String(name),
              fileUrl: String(url),
              series: String(sid),
            },
          ]);
        }
      } else {
        // 2. isFavorite 가 false 라면 아래 useEffect 에서 저장된 favoriteItems 상태에서 현재 데이터를 제거
        const isDataExist = favoriteItems.some(
          (item: LocalStorageFavoriteItem) =>
            item.fileUrl === currentData!.fileUrl
        );
        if (isDataExist) {
          // 2-1 데이터 제거
          setFavoriteItems(
            favoriteItems.filter(
              (item: LocalStorageFavoriteItem) =>
                item.fileUrl !== currentData?.fileUrl
            )
          );
        } else {
          // 2-2 패스
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [isFavorite]);

  useEffect(() => {
    //  3. 현재 favoriteItems 상태를 localStorage 에 업데이트
    if (!loading) {
      localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
    }
  }, [favoriteItems]);

  useEffect(() => {
    // 카카오 공유기능 초기화
    try {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
    } catch (e) {
      //
    } finally {
      // console.log("카카오 상태");
      // console.log(window.Kakao.isInitialized());
    }

    const currentItem: LocalStorageFavoriteItem = {
      fileName: String(name),
      fileUrl: String(url),
      series: String(sid),
    };
    // 위의 useEffect 에서 사용할 currentData
    setCurrentData(currentItem);

    // 페이지에 처음 들어올때 LocalStorage 에 해당 아이템이 있나 검증
    const localStorageFavoriteItems: LocalStorageFavoriteItem[] | [] =
      JSON.parse(
        //_apo.tsx 에서 favoriteItems 를 초기화해주고 있어 항상 존재
        localStorage.getItem("favoriteItems")!
      );
    // 들어올때 localStorage 의 favoriteItems favoriteItems 상태에 저장
    setFavoriteItems(localStorageFavoriteItems);
    //1. 배열에 현재 아이템이 들어있는지 확인
    if (localStorageFavoriteItems.length > 0) {
      const itemExistsOnFavoriteItems = localStorageFavoriteItems.some(
        (item: LocalStorageFavoriteItem) => item.fileUrl === currentItem.fileUrl
      );
      // 1-1 아이템이 있다면
      if (itemExistsOnFavoriteItems) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, []);

  return (
    <div className="relative box-border flex h-screen w-full animate-fade-in flex-col bg-black pt-HeaderHeight">
      {!loading && (
        <div className="h-[100%] w-full" onClick={toggleIsClicked}>
          {fileType.includes("image") && (
            <Image
              alt="사진"
              src={fileUrl}
              fill
              style={{ objectFit: "contain" }}
              priority={true}
              sizes="33vw"
              loading="eager"
              placeholder="blur"
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
            />
          )}
          {fileType.includes("video") && (
            <div className="flexCenter h-full w-full">
              <video src={fileUrl} controls autoPlay />
            </div>
          )}

          <div
            className={`justify absolute top-[7vh] flex w-full items-center justify-end p-PageLR text-white ${
              isClicked ? "animate-fade-in" : "animate-fade-out"
            } `}
          >
            <div className="box-border flex animate-pulse items-center justify-end gap-6 rounded-3xl bg-black bg-opacity-50 p-5">
              <div
                onClick={(e) => toggleIsFavorite(e)}
                className="scaleUpOnHover-125 cursor-pointer"
              >
                <FavoritesIcon
                  width={30}
                  height={30}
                  stroke={isFavorite ? "#bb4935" : "#aaaaaa"}
                  fill={isFavorite ? "#bb4935" : "#aaaaaa"}
                />
              </div>
              <div
                onClick={(e) => handleShare(e)}
                className="scaleUpOnHover-125 cursor-pointer"
              >
                <Image
                  src="/icons/kakaotalk.png"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoDetail;
