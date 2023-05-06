import NewestComment from "@/components/Comment/NewestComment";
import BoxShowCase from "@/components/Home/BoxShowCase";
import RecentSlide from "@/components/Home/RecentSlide";
import SlideBanner from "@/components/Home/SlideBanner";
import ShareNextAnime from "@/components/ShareNextAnime";
import MainLayout from "@/layouts/MainLayout";
import {
  getMostPopular,
  getRecentAnime,
  getTopAiring,
  getTrendingAnime,
  searchAdvanced,
} from "@/services/anime";
import { Anime, RecentAnime } from "@/types/anime";
import { convertQueryArrayParams } from "@/utils/contants";
import { GetServerSideProps } from "next";
import React from "react";

interface HomeProps {
  recentAnime: RecentAnime[];
  tredingAnime: Anime[];
  topAiringAnime: Anime[];
  mostPopularAnime: Anime[];
  favouritesAnime: Anime[];
  completedAnime: Anime[];
}

const Home: React.FC<HomeProps> = ({
  recentAnime,
  tredingAnime,
  topAiringAnime,
  completedAnime,
  favouritesAnime,
  mostPopularAnime,
}) => {
  return (
    <MainLayout>
      <SlideBanner tredingAnime={tredingAnime} />
      <div className="p-4">
        <RecentSlide recentAnime={recentAnime} />
      </div>
      <ShareNextAnime />
      <NewestComment />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 p-4">
        <BoxShowCase title="Top Airing" anime={topAiringAnime} />
        <BoxShowCase title="Most Popular" anime={mostPopularAnime} />
        <BoxShowCase title="Most Favorite" anime={favouritesAnime} />
        <BoxShowCase title="Completed" anime={completedAnime} />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [
      recentAnime,
      tredingAnime,
      topAiringAnime,
      mostPopularAnime,
      favouritesAnime,
      completedAnime,
    ] = await Promise.all([
      getRecentAnime(20),
      getTrendingAnime(20),
      getTopAiring(5),
      getMostPopular(5),
      searchAdvanced({
        sort: convertQueryArrayParams(["START_DATE_DESC"]),
        type: "ANIME",
        perPage: 5,
      }),
      searchAdvanced({
        type: "ANIME",
        status: "FINISHED",
        perPage: 5,
        sort: convertQueryArrayParams(["SCORE_DESC"]),
      }),
    ]);

    return {
      props: {
        recentAnime,
        tredingAnime,
        topAiringAnime,
        mostPopularAnime,
        favouritesAnime,
        completedAnime,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Home;
