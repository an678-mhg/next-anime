import AnimeCard from "@/src/components/Card/AnimeCard";
import GenresItem from "@/src/components/GenresItem";
import ShareNextAnime from "@/src/components/ShareNextAnime";
import ShareSocial from "@/src/components/ShareSocial";
import MainLayout from "@/src/layouts/MainLayout";
import { getAnimeInfo } from "@/src/services/anime";
import { AnimeInfo } from "@/src/types/anime";
import { setBackgroundImage } from "@/src/utils/contants";
import path from "@/src/utils/path";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import { AiFillClockCircle, AiOutlineRight } from "react-icons/ai";
import {
  BsDot,
  BsFillCalendarDateFill,
  BsFillPlayCircleFill,
} from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface AnimeProps {
  info: AnimeInfo;
}

const Anime: React.FC<AnimeProps> = ({ info }) => {
  return (
    <MainLayout>
      <div
        style={setBackgroundImage(info?.cover)}
        className="w-full lg:aspect-[3/1.5] md:aspect-[3/2] aspect-[9/17] banner relative"
      >
        <div className="absolute inset-0 z-[99] flex lg:flex-row flex-col">
          <div className="flex md:flex-row flex-col flex-1 lg:p-[70px] p-4 mt-[56px]">
            <LazyLoadImage
              effect="blur"
              src={info?.image}
              className="w-[180px] rounded-md"
            />
            <div className="lg:ml-[60px] md:ml-10 flex-1 md:mt-0 mt-5">
              <h4 className="flex items-center space-x-2 text-[12px] font-normal">
                <Link href={path.home}>Home</Link>
                <BsDot />
                <p className="text-[#aaaaaa]">
                  {info?.title?.english || info?.title?.userPreferred}
                </p>
              </h4>
              <h5 className="text-[40px] font-semibold mt-2">
                {info?.title?.english || info?.title?.userPreferred}
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
                  className="text-black bg-[#cae962] md:px-4 px-2 py-2 md:rounded-full rounded-md flex items-center space-x-2"
                  href={path.watch(info?.id)}
                >
                  <BsFillPlayCircleFill className="md:text-sm text-lg" />
                  <span className="font-semibold md:block hidden">
                    Watch now
                  </span>
                </Link>
                <button className="text-white bg-gray-500 md:px-4 px-2 py-2 md:rounded-full rounded-md flex items-center md:space-x-2">
                  <span className="font-semibold md:block hidden">
                    Add to List
                  </span>
                  <AiOutlineRight className="md:text-sm text-lg" />
                </button>
              </div>
              <div
                className="text-[14px] font-normal mt-4 line-clamp-5"
                dangerouslySetInnerHTML={{ __html: info?.description }}
              />
              <div className="items-center space-x-5 mt-5 flex">
                <div className="text-sm border-l-[2px] border-[#CAE962] pl-4">
                  <h4 className="text-[#CAE962] font-semibold">
                    Share Next Anime
                  </h4>
                  <p>to your friends</p>
                </div>
                <ShareSocial link="abc" title="Next Anime" />
              </div>
            </div>
          </div>
          <div className="w-[342px] xl:flex bg-[rgba(255,255,255,.1)] px-5 hidden items-center">
            <div className="w-full">
              <div className="space-y-3 border-b border-gray-200 w-full pb-5">
                <div className="flex text-sm space-x-2">
                  <p className="font-semibold">Japanese:</p>
                  <p className="line-clamp-1">{info?.title?.native}</p>
                </div>
                <div className="flex text-sm space-x-2">
                  <p className="font-semibold">Synonyms:</p>
                  <p className="line-clamp-1">{info?.synonyms[0]}</p>
                </div>
                <div className="flex text-sm space-x-2">
                  <p className="font-semibold">Aired:</p>
                  <p className="line-clamp-1">
                    {info?.nextAiringEpisode?.airingTime}
                  </p>
                </div>
                <div className="flex text-sm space-x-2">
                  <p className="font-semibold">Country:</p>
                  <p className="line-clamp-1">{info?.countryOfOrigin}</p>
                </div>
                <div className="flex text-sm space-x-2">
                  <p className="font-semibold">Daration:</p>
                  <p className="line-clamp-1">{info?.duration}</p>
                </div>
                <div className="flex text-sm space-x-2">
                  <p className="font-semibold">Status:</p>
                  <p className="line-clamp-1">{info?.status}</p>
                </div>
                <div className="flex text-sm space-x-2">
                  <p className="font-semibold">Rating:</p>
                  <p className="line-clamp-1">{info?.rating}</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 border-b border-gray-200 pb-5">
                {info?.genres?.map((item) => (
                  <GenresItem key={item} genres={item} />
                ))}
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex text-sm space-x-2">
                  <p className="font-semibold">Studios:</p>
                  <p>{info?.studios}</p>
                </div>
                <div className="flex text-sm space-x-2">
                  <p className="font-semibold">Current episode:</p>
                  <p>{info?.currentEpisode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {info?.relations?.length > 0 && (
        <div className="p-4 mt-5">
          <h3 className="font-semibold text-xl text-[#cae962]">
            Relations for anime
          </h3>
          <div className="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-5 mt-5">
            {info?.relations?.map((item) => (
              <AnimeCard
                key={item?.id}
                id={item?.id.toString()}
                image={item?.image}
                title={item?.title?.english || item?.title?.userPreferred}
                type={item?.type}
              />
            ))}
          </div>
        </div>
      )}

      {info?.recommendations?.length > 0 && (
        <div className="p-4">
          <h3 className="font-semibold text-xl text-[#cae962]">
            Recommended for you
          </h3>
          <div className="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-5 mt-5">
            {info?.recommendations?.map((item) => (
              <AnimeCard
                key={item?.id}
                id={item?.id.toString()}
                image={item?.image}
                title={item?.title?.english || item?.title?.userPreferred}
                type={item?.type}
              />
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const id = context.params?.id as string;

    if (!id) {
      return {
        notFound: true,
      };
    }

    const info = await getAnimeInfo(id);

    return {
      props: {
        info,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Anime;
