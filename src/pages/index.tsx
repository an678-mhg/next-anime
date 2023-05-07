import NewestComment from "@/src/components/Comment/NewestComment";
import BoxShowCase from "@/src/components/Home/BoxShowCase";
import ShareNextAnime from "@/src/components/ShareNextAnime";
import MainLayout from "@/src/layouts/MainLayout";
import {
  getMostPopular,
  getRecentAnime,
  getTopAiring,
  getTrendingAnime,
  searchAdvanced,
} from "@/src/services/anime";
import { Anime, RecentAnime } from "@/src/types/anime";
import { convertQueryArrayParams } from "@/src/utils/contants";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import AnimeCard from "../components/Card/AnimeCard";
import AnimeGridLayout from "../layouts/AnimeGridLayout";

interface HomeProps {
  recentAnime: RecentAnime[];
  tredingAnime: Anime[];
  topAiringAnime: Anime[];
  mostPopularAnime: Anime[];
  favouritesAnime: Anime[];
  completedAnime: Anime[];
}

const SlideBanner = dynamic(() => import("../components/Home/SlideBanner"), {
  ssr: false,
});

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
      <AnimeGridLayout title="Recent Anime Episodes" className="p-4">
        {recentAnime?.map((item) => (
          <AnimeCard
            key={item?.id}
            id={item?.id.toString()}
            image={item?.image}
            title={item?.title}
            type={item?.type}
          />
        ))}
      </AnimeGridLayout>
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

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [
      recentAnime,
      tredingAnime,
      topAiringAnime,
      mostPopularAnime,
      favouritesAnime,
      completedAnime,
    ] = await Promise.all([
      getRecentAnime(16),
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
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Home;
