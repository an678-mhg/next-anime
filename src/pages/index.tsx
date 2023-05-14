import BoxShowCase from "@/src/components/Home/BoxShowCase";
import ShareNextAnime from "@/src/components/ShareNextAnime";
import MainLayout from "@/src/layouts/MainLayout";
import {
  getMostPopular,
  getRandomAnime,
  getRecentAnime,
  getTopAiring,
  getTrendingAnime,
  searchAdvanced,
} from "@/src/services/anime";
import { Anime, AnimeInfo, RecentAnime } from "@/src/types/anime";
import { convertQueryArrayParams, getAnimeTitle } from "@/src/utils/contants";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import AnimeCard from "../components/Anime/AnimeCard";
import AnimeGridLayout from "../layouts/AnimeGridLayout";
import Meta from "../components/Meta";
import RandomAnime from "../components/Anime/RandomAnime";

interface HomeProps {
  recentAnime: RecentAnime[];
  tredingAnime: Anime[];
  topAiringAnime: Anime[];
  mostPopularAnime: Anime[];
  favouritesAnime: Anime[];
  completedAnime: Anime[];
  randomAnime: AnimeInfo;
}

const SlideBanner = dynamic(() => import("../components/Home/SlideBanner"), {
  ssr: false,
});
const NewestComment = dynamic(
  () => import("../components/Comment/NewestComment"),
  { ssr: false }
);

const Home: React.FC<HomeProps> = ({
  recentAnime,
  tredingAnime,
  topAiringAnime,
  completedAnime,
  favouritesAnime,
  mostPopularAnime,
  randomAnime,
}) => {
  return (
    <MainLayout>
      <Meta
        title="Next Anime"
        image="https://res.cloudinary.com/annnn/image/upload/v1683898263/logo_id1pyr.png"
        description="Next Anime is a free anime watch website built using Consumet API"
      />
      <SlideBanner tredingAnime={tredingAnime} />
      <AnimeGridLayout title="Recent Anime Episodes" className="p-4">
        {recentAnime?.map((item) => (
          <AnimeCard
            color={item?.color}
            key={item?.id}
            id={item?.id.toString()}
            image={item?.image}
            title={getAnimeTitle(item?.title)}
            type={item?.type}
          />
        ))}
      </AnimeGridLayout>
      <ShareNextAnime />
      <RandomAnime anime={randomAnime} />
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
      randomAnime,
    ] = await Promise.all([
      getRecentAnime(8),
      getTrendingAnime(20),
      getTopAiring(5),
      getMostPopular(5),
      searchAdvanced({
        sort: convertQueryArrayParams(["FAVOURITES_DESC"]),
        type: "ANIME",
        perPage: 5,
      }),
      searchAdvanced({
        type: "ANIME",
        status: "FINISHED",
        perPage: 5,
        sort: convertQueryArrayParams(["SCORE_DESC"]),
      }),
      getRandomAnime(),
    ]);

    return {
      props: {
        recentAnime,
        tredingAnime,
        topAiringAnime,
        mostPopularAnime,
        favouritesAnime: favouritesAnime.results,
        completedAnime: completedAnime.results,
        randomAnime,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Home;
