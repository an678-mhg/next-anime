import AnimeCard from "@/src/components/Card/AnimeCard";
import GenresItem from "@/src/components/GenresItem";
import ShareSocial from "@/src/components/ShareSocial";
import AnimeGridLayout from "@/src/layouts/AnimeGridLayout";
import MainLayout from "@/src/layouts/MainLayout";
import { getAnimeInfo } from "@/src/services/anime";
import { AnimeInfo } from "@/src/types/anime";
import { getAnimeTitle, setBackgroundImage } from "@/src/utils/contants";
import path from "@/src/utils/path";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import React from "react";
import { AiFillClockCircle, AiOutlinePlus } from "react-icons/ai";
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
        className="w-full h-screen relative banner"
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
                <p className="text-[#aaaaaa] line-clamp-1">
                  {getAnimeTitle(info?.title)}
                </p>
              </h4>
              <h5 className="md:text-4xl text:2xl font-semibold mt-2 line-clamp-2">
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
                  className="text-black bg-[#cae962] px-4 py-2 rounded-full flex items-center space-x-2"
                  href={path.watch(info?.id, info?.episodes?.[0]?.id)}
                >
                  <BsFillPlayCircleFill className="md:text-sm text-lg" />
                  <span className="font-semibold text-sm">Watch now</span>
                </Link>
                <button className="text-white bg-gray-500 px-4 py-2 rounded-full flex items-center space-x-2">
                  <span className="text-sm font-semibold">Add to List</span>
                  <AiOutlinePlus className="md:text-sm text-lg" />
                </button>
              </div>
              <div
                className="text-[14px] font-normal mt-4 md:line-clamp-5 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: info?.description }}
              />
              <div className="items-center space-x-5 mt-5 flex">
                <div className="text-sm border-l-[2px] border-[#CAE962] pl-4">
                  <h4 className="text-[#CAE962] font-semibold">
                    Share Next Anime
                  </h4>
                  <p>to your friends</p>
                </div>
                <ShareSocial
                  link={process.env.NEXT_PUBLIC_NEXT_ANIME_URL as string}
                  title="Next Anime"
                />
              </div>
            </div>
          </div>
          <div className="w-[342px] lg:flex hidden bg-[rgba(255,255,255,.1)] px-5 items-center">
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
        <AnimeGridLayout title="Relations for anime" className="p-4 mt-5">
          {info?.relations?.map((item) => (
            <AnimeCard
              key={item?.id}
              id={item?.id.toString()}
              image={item?.image}
              title={item?.title}
              type={item?.type}
            />
          ))}
        </AnimeGridLayout>
      )}

      {info?.recommendations?.length > 0 && (
        <AnimeGridLayout title="Recommended for you" className="p-4 mt-5">
          {info?.recommendations?.map((item) => (
            <AnimeCard
              key={item?.id}
              id={item?.id.toString()}
              image={item?.image}
              title={item?.title}
              type={item?.type}
            />
          ))}
        </AnimeGridLayout>
      )}
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
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
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Anime;
