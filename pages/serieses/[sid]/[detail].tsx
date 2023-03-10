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
  const [fileUrl, setFileUrl] = useState(String(url));
  const [loading, setLoading] = useState(true);

  const toggleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  const handleShare = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    //FIXME: 공유기능 구현하기, 웹 에서는 https 에서만 동작하고 웹뷰에서는 동작하지 않는다 함
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
  };

  const toggleIsFavorite = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
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

  useEffect(() => {
    // 카카오 공유기능 초기화
    try {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
    } catch (e) {
      //
    } finally {
      console.log("카카오 상태");
      console.log(window.Kakao.isInitialized());
    }

    // Favorite 기능 위해 로컬 스토리지 사용
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
            <div className="box-border  flex items-center justify-end gap-6 rounded-3xl bg-black bg-opacity-50 p-5">
              <div
                onClick={(e) => toggleIsFavorite(e)}
                className="scaleUpOnHover-125"
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
                className="scaleUpOnHover-125"
              >
                <MessageIcon fill="#ffffff" width={30} height={30} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoDetail;
