import { getAnimeTitle } from "@/src/utils/contants";
import path from "@/src/utils/path";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillClockCircle, AiOutlinePlus } from "react-icons/ai";
import {
  BsCheck2,
  BsDot,
  BsFillCalendarDateFill,
  BsFillPlayCircleFill,
} from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ShareSocial from "../ShareSocial";
import { AnimeInfo } from "@/src/types/anime";
import AnimeInfoDetail from "./AnimeInfoDetail";
import { checkAnimeInList, createList } from "@/src/services/list";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { CircularProgress } from "react-cssfx-loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface AnimeBannerDetailProps {
  info: AnimeInfo;
}

const AnimeBannerDetail: React.FC<AnimeBannerDetailProps> = ({ info }) => {
  const [isInTheList, setIsInTheList] = useState(false);
  const [isError, setIsError] = useState(false);
  const [checkAnimeLoading, setCheckAnimeLoading] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const { mutateAsync, isLoading } = useMutation(createList, {
    onSuccess: (response) => {
      toast.success(`${response.status} anime in list success`);
      setIsInTheList(() => (response.status === "Add" ? true : false));
    },
    onError: () => {
      toast.error("Add anime in list failed");
      setIsInTheList((prev) => !prev);
    },
  });

  useEffect(() => {
    if (!session?.user) {
      return;
    }

    setCheckAnimeLoading(true);

    checkAnimeInList(info?.id)
      .then((data) => {
        data ? setIsInTheList(true) : setIsInTheList(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setCheckAnimeLoading(false));
  }, [session?.user, info?.id]);

  const handleClick = () => {
    if (!session?.user) {
      return router?.push(
        `${path.signIn}?redirect=${encodeURIComponent(router?.asPath)}`
      );
    }

    if (isError) {
      return toast.error("Something went wrong f5 and try again");
    }

    if (isInTheList) {
      if (!window.confirm("You want to remove this anime from the list")) {
        return;
      }
    }

    mutateAsync({
      animeColor: info?.color || "#fff",
      animeId: info?.id,
      animeImage: info?.image,
      animeTitle: getAnimeTitle(info?.title),
      animeType: info?.type,
    });
  };

  return (
    <div className="absolute inset-0 z-[99] flex md:flex-row flex-col">
      <div className="flex lg:flex-row flex-col flex-1 lg:p-[70px] p-4 mt-[56px]">
        <div className="md:block flex md:justify-start justify-center">
          <LazyLoadImage
            effect="blur"
            src={info?.image}
            className="md:w-[180px] w-[150px] rounded-md"
          />
        </div>
        <div className="lg:ml-[60px] flex-1 lg:mt-0 mt-5">
          <h4 className="flex items-center space-x-2 text-[12px] font-normal">
            <Link href={path.home}>Home</Link>
            <BsDot />
            <p className="text-[#aaaaaa] line-clamp-1">
              {getAnimeTitle(info?.title)}
            </p>
          </h4>
          <h5
            style={{ color: info.color }}
            className="lg:text-4xl text:2xl font-semibold mt-2 line-clamp-2"
          >
            {getAnimeTitle(info?.title)}
          </h5>
          <div className="flex items-center space-x-3 mt-2">
            {info?.type && (
              <p className="flex items-center space-x-2 text-sm">
                <BsFillPlayCircleFill />
                <span className="text-xs">{info?.type}</span>
              </p>
            )}
            {info?.duration && (
              <p className="flex items-center space-x-2 text-sm">
                <AiFillClockCircle />
                <span className="text-xs">{info?.duration}m</span>
              </p>
            )}
            {info?.releaseDate && (
              <p className="flex items-center space-x-2 text-sm">
                <BsFillCalendarDateFill />
                <span className="text-xs">{info?.releaseDate}</span>
              </p>
            )}
          </div>
          <div className="space-x-4 flex items-center mt-5">
            <Link
              className="bg-primary text-center px-4 py-2 rounded-full flex items-center space-x-2"
              href={path.watch(info?.id)}
            >
              <BsFillPlayCircleFill className="md:text-sm text-lg" />
              <span className="font-semibold text-sm">Watch now</span>
            </Link>
            <button
              disabled={isLoading || checkAnimeLoading}
              onClick={handleClick}
              className={`text-white text-center bg-gray-500 px-4 py-2 rounded-full flex items-center space-x-2 ${
                (isLoading || checkAnimeLoading) && "opacity-80"
              }`}
            >
              <span className="text-sm font-semibold">
                {isLoading || checkAnimeLoading
                  ? "Loading"
                  : isInTheList
                  ? "Exist in List"
                  : "Add in List"}
              </span>
              {isLoading || checkAnimeLoading ? (
                <CircularProgress color="#fff" width={20} height={20} />
              ) : isInTheList ? (
                <BsCheck2 className="md:text-sm text-lg text-green-500" />
              ) : (
                <AiOutlinePlus className="md:text-sm text-lg" />
              )}
            </button>
          </div>
          <div
            className="text-[14px] font-normal mt-4 line-clamp-5"
            dangerouslySetInnerHTML={{ __html: info?.description }}
          />
          <div className="items-center space-x-5 mt-5 flex">
            <div className="text-sm border-l-[2px] border-primary pl-4">
              <h4 className="text-primary font-semibold">Share</h4>
              <p>to your friends</p>
            </div>
            <ShareSocial
              link={`${process.env.NEXT_PUBLIC_NEXT_ANIME_URL}/anime/${info.id}`}
              title={`Next Anime - ${getAnimeTitle(info?.title)} - Detail`}
            />
          </div>
        </div>
      </div>
      <div className="md:block hidden h-full">
        <AnimeInfoDetail info={info} />
      </div>
    </div>
  );
};

export default AnimeBannerDetail;
