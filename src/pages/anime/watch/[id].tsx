import Meta from "@/src/components/Shared/Meta";
import AnimeInfoComp from "@/src/components/Watch/AnimeInfo";
import EpisodeInfo from "@/src/components/Watch/EpisodeInfo";
import EpisodeList from "@/src/components/Watch/EpisodeList";
import MoreLikeThis from "@/src/components/Watch/MoreLikeThis";
import {
  default_provider,
  getAnimeEpisodeStreaming,
  getAnimeInfo,
} from "@/src/services/anime";
import { AnimeInfo } from "@/src/types/anime";
import { Episode } from "@/src/types/utils";
import { getAnimeTitle, getStreamAnimeWithProxy } from "@/src/utils/contants";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import Note from "@/src/components/Watch/Note";
import Comment from "@/src/components/Watch/Comment";
import MainLayout from "@/src/layouts/MainLayout";
import Hls from "hls.js";

interface WatchProps {
  info: AnimeInfo;
}

const Player = dynamic(() => import('@/src/components/Player'), {ssr: false})

const Watch: React.FC<WatchProps> = ({ info }) => {
  const [episode, setEpisode] = useState<Episode>(info?.episodes?.[0]);
  const [isWatchIframe, setIsWatchIframe] = useState(false);

  const playerRef = useRef<HTMLVideoElement | null>(null);

  const router = useRouter();

  const { data, isError, isFetching } = useQuery(
    [`watch-${JSON.stringify(episode)}`],
    () => {
      if (!episode) return null;
      return getAnimeEpisodeStreaming(
        episode?.id
      );
    }
  );

  const handleSelectEpisode = (episode: Episode) => {
    setEpisode(episode);
  }

  useEffect(() => {
    setEpisode(info?.episodes?.[0]);
    setIsWatchIframe(false);
  }, [router?.query?.provider]);

  useEffect(() => {
    return () => {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      }
    };
  }, [episode]);

  return (
    <MainLayout>
      <Meta
        title={`Next Anime - ${getAnimeTitle(info?.title)} - Watch`}
        image={info?.cover}
        description="Next Anime is a free anime watch website built using Consumet API"
      />
      <div className="lg:flex container mt-[56px] pb-8">
        <div className="lg:pb-5 lg:w-[calc(100%-300px)]">
          <div className="w-full bg-[#222] z-[9999] aspect-video flex items-center justify-center">
            {!episode && (
              <h5 className="text-sm font-semibold">
                Please select the episode
              </h5>
            )}
            {isError && (
              <h5 className="text-sm font-semibold">
                Failed to data source episode
              </h5>
            )}
            {isFetching && (
              <h5 className="text-sm font-semibold">Loading episode data</h5>
            )}
            {!isError && !isFetching && episode && data && (
              <div className="w-full h-full">
                {isWatchIframe ? (
                  <iframe
                    src={data?.headers?.Referer}
                    className="w-full h-full"
                    allowFullScreen
                  />
                ) : (
                  <Player
                    Hls={Hls}
                    source={data?.sources?.map(item => ({label: item?.quality, url: item?.url}))}
                    color="#FF0000"
                    poster={episode?.image}
                    className="w-full h-full"
                    playerRef={playerRef}
                  />
                )}
              </div>
            )}
          </div>
          <div className="md:flex w-full mt-4 px-4">
            <div className="w-full md:mt-0">
              <div className="flex md:flex-row flex-col md:space-y-0 space-y-3 md:items-center md:space-x-4 justify-end">
                {data?.headers?.Referer && (
                  <button
                    onClick={() => setIsWatchIframe((prev) => !prev)}
                    className="bg-[#222] py-2 px-4 inline-block rounded-md font-semibold text-white text-sm"
                  >
                    {!isWatchIframe ? "Enable" : "Disable"} iframe
                  </button>
                )}
              </div>
              <EpisodeList
                animeId={info?.id}
                episodeId={episode?.id as string}
                episodes={info?.episodes}
                handleSelectEpisode={handleSelectEpisode}
              />
              <Note />
              {episode && <EpisodeInfo episode={episode} />}
              <AnimeInfoComp
                description={info?.description}
                duration={info?.duration}
                image={info?.image}
                releaseDate={info?.releaseDate}
                title={info?.title}
                type={info?.type}
                nextAiringEpisode={info?.nextAiringEpisode}
              />
              <Comment
                animeId={info?.id}
                animeName={getAnimeTitle(info?.title)}
              />
            </div>
          </div>
        </div>

        <MoreLikeThis
          recommendations={info?.recommendations}
          relations={info?.relations}
        />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const id = context.params?.id as string;
    const provider = (context.query?.provider as string) || default_provider;

    if (!id) {
      return {
        notFound: true,
      };
    }

    const info = await getAnimeInfo(id, provider);

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

export default Watch;
