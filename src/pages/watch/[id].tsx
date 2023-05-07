import Footer from "@/src/components/Footer";
import ShowCaseItem from "@/src/components/ShowCaseItem";
import TitlePrimary from "@/src/components/TitlePrimary";
import {
  default_provider,
  getAnimeEpisodeStreaming,
  getAnimeInfo,
} from "@/src/services/anime";
import { AnimeEpisodeStreaming, AnimeInfo } from "@/src/types/anime";
import { getAnimeTitle } from "@/src/utils/contants";
import path from "@/src/utils/path";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { BsFillCalendarDateFill, BsFillPlayCircleFill } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Select from "react-select";

const provider = [
  { value: "gogoanime", label: "Gogo" },
  { value: "zoro", label: "Zoro" },
];

interface WatchProps {
  info: AnimeInfo;
  streaming: AnimeEpisodeStreaming | null;
  episodeId: string;
}

const NetPlayer = dynamic(() => import("netplayer"), { ssr: false });

const Watch: React.FC<WatchProps> = ({ info, streaming, episodeId }) => {
  const [selectType, setSelectType] = useState("Related");

  const moreLikeThis =
    selectType === "Related" ? info?.relations : info?.recommendations;

  return (
    <div>
      <div className="pb-5">
        <div className="bg-black w-full md:aspect-[3/1] aspect-video flex items-center justify-center">
          {streaming ? (
            <NetPlayer
              className="w-full h-full"
              sources={streaming?.sources?.map((item) => ({
                file: item.url,
                label: item?.quality,
                type: "hls",
              }))}
            />
          ) : (
            <h5 className="text-sm font-semibold">Please select the episode</h5>
          )}
        </div>
        <div className="w-[1200px] max-w-[calc(100%-32px)] mx-auto md:flex">
          <div className="md:w-[calc(100%-402px)] w-full md:p-5 md:mt-0 mt-5">
            <div className="flex items-center space-x-3 justify-end">
              <h4 className="text-sm font-semibold">Source:</h4>
              <Select
                className="w-[200px]"
                options={provider}
                defaultValue={provider[0]}
                styles={{
                  control: (base) => ({
                    ...base,
                    background: "#333",
                    color: "#fff",
                  }),
                }}
              />
            </div>
            <div className="flex space-x-4 w-full overflow-x-scroll mt-5">
              {info?.episodes?.map((item) => (
                <Link
                  href={path.watch(info?.id, item?.id)}
                  className={`${
                    episodeId === item.id
                      ? "bg-[#cae962] text-black"
                      : "bg-[#333] text-white"
                  } px-4 py-2 text-center cursor-pointer rounded-md text-sm font-semibold`}
                >
                  EP {item.number}
                </Link>
              ))}
            </div>
            <div className="mt-5">
              <TitlePrimary title="Info" />
              <div className="mt-5 flex md:space-x-5 md:flex-row flex-col">
                <LazyLoadImage
                  effect="blur"
                  src={info?.image}
                  className="w-[200px] rounded-md"
                />
                <div className="flex-1 md:mt-0 mt-5">
                  <h6 className="text-2xl font-semibold">
                    {getAnimeTitle(info?.title)}
                  </h6>
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
                  <div
                    className="text-[14px] font-normal mt-4"
                    dangerouslySetInnerHTML={{ __html: info?.description }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-[402px] w-full mt-5">
            <div className="space-x-4">
              {["Related", "Recommendations"].map((item) => (
                <button
                  className={`${
                    selectType === item
                      ? "bg-[#cae962] text-black"
                      : "bg-[#333] text-white"
                  } rounded-md px-4 py-2 text-sm font-semibold outline-none`}
                  key={item}
                  onClick={() => setSelectType(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-5 space-y-5">
              {moreLikeThis?.map((item) => (
                <ShowCaseItem
                  key={item.id}
                  id={item?.id.toString()}
                  image={item?.image}
                  title={item?.title}
                  type={item?.type}
                  border={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const id = context.params?.id as string;
    const provider = (context.query?.provider as string) || default_provider;
    const episodeId = context?.query?.episodeId as string;

    if (!id) {
      return {
        notFound: true,
      };
    }

    const [info, streaming] = await Promise.all([
      getAnimeInfo(id, provider),
      episodeId ? getAnimeEpisodeStreaming(episodeId) : Promise.resolve(null),
    ]);

    return {
      props: {
        info,
        streaming,
        episodeId: episodeId || "",
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Watch;
