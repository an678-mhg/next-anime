import Footer from "@/src/components/Footer";
import AnimeInfoComp from "@/src/components/Watch/AnimeInfo";
import EpisodeInfo from "@/src/components/Watch/EpisodeInfo";
import EpisodeList from "@/src/components/Watch/EpisodeList";
import MoreLikeThis from "@/src/components/Watch/MoreLikeThis";
import SelectSource from "@/src/components/Watch/SelectSource";
import {
  default_provider,
  getAnimeEpisodeStreaming,
  getAnimeInfo,
} from "@/src/services/anime";
import { AnimeInfo } from "@/src/types/anime";
import { Episode } from "@/src/types/utils";
import { getStreamAnimeWithProxy } from "@/src/utils/contants";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface WatchProps {
  info: AnimeInfo;
}

const Player = dynamic(() => import("../../components/Player"), {
  ssr: false,
});

const Watch: React.FC<WatchProps> = ({ info }) => {
  const [episode, setEpisode] = useState<Episode>(info?.episodes?.[0]);
  const router = useRouter();

  const { data, isError, isFetching } = useQuery([episode], () => {
    if (!episode) return null;
    return getAnimeEpisodeStreaming(
      episode?.id,
      (router?.query?.provider as string) || "gogoanime"
    );
  });

  const handleSelectEpisode = (episode: Episode) => {
    setEpisode(episode);
  };

  const handleNextEpisode = () => {
    const currentIndexEpisode = info?.episodes?.findIndex(
      (item) => item?.id === episode?.id
    );

    if (currentIndexEpisode < info?.episodes?.length - 1) {
      setEpisode(info?.episodes?.[currentIndexEpisode + 1]);
      return true;
    }

    return false;
  };

  useEffect(() => {
    setEpisode(info?.episodes?.[0]);
  }, [router?.query?.provider]);

  return (
    <div>
      <div className="pb-5">
        <div className="bg-[#111] w-full lg:aspect-[3/1] z-[9999] aspect-video flex items-center justify-center">
          {!episode && (
            <h5 className="text-sm font-semibold">Please select the episode</h5>
          )}
          {isError && (
            <h5 className="text-sm font-semibold">
              Failed to data source episode
            </h5>
          )}
          {isFetching && (
            <h5 className="text-sm font-semibold">Loading episode data...</h5>
          )}
          {!isFetching && episode && data && (
            <Player
              source={data?.sources?.map((item) => ({
                label: item?.quality,
                url:
                  router?.query?.provider === "gogoanime"
                    ? item?.url
                    : getStreamAnimeWithProxy(item?.url),
              }))}
              className="w-full h-full"
              poster={episode?.image as string}
              color="#CAE962"
              subtitle={data?.subtitles?.map((item) => ({
                lang: item.lang,
                url: `/api/subtitles?url=${encodeURIComponent(item?.url)}`,
              }))}
              handleNext={handleNextEpisode}
            />
          )}
        </div>
        <div className="md:flex">
          <div className="md:w-[calc(100%-402px)] w-full md:p-4 md:mt-0 mt-5">
            <SelectSource idAnime={info?.id} />
            <EpisodeList
              animeId={info?.id}
              episodeId={episode?.id as string}
              episodes={info?.episodes}
              handleSelectEpisode={handleSelectEpisode}
            />
            <EpisodeInfo episode={episode} />
            <AnimeInfoComp
              description={info?.description}
              duration={info?.duration}
              image={info?.image}
              releaseDate={info?.releaseDate}
              title={info?.title}
              type={info?.type}
              nextAiringEpisode={info?.nextAiringEpisode}
            />
          </div>
          <MoreLikeThis
            recommendations={info?.recommendations}
            relations={info?.relations}
          />
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
