import BoxShowCase from "@/src/components/Home/BoxShowCase";
import ShareNextAnime from "@/src/components/ShareNextAnime";
import MainLayout from "@/src/layouts/MainLayout";
import { getAnimeTitle } from "@/src/utils/contants";
import dynamic from "next/dynamic";
import AnimeCard from "../components/Anime/AnimeCard";
import Meta from "../components/Meta";
import TitlePrimary from "../components/TitlePrimary";
import { SwiperSlide } from "swiper/react";
import { useQuery } from "react-query";
import { getHomePage } from "../services/anime";
import { CircularProgress } from "react-cssfx-loading";
import NotFound from "../components/404NotFound";

const SlideBanner = dynamic(() => import("../components/Home/SlideBanner"), {
  ssr: false,
});

const NewestComment = dynamic(
  () => import("../components/Comment/NewestComment"),
  { ssr: false }
);

const SwiperContainer = dynamic(() => import("../components/SwiperContainer"), {
  ssr: false,
});

const Home = () => {
  const { data, isLoading, isError } = useQuery("home", getHomePage);

  if (!data || isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <CircularProgress color="#FF0000" />
      </div>
    );
  }

  if (isError) {
    return <NotFound />;
  }

  const [
    recentAnime,
    tredingAnime,
    topAiringAnime,
    mostPopularAnime,
    favouritesAnime,
    completedAnime,
    comments,
  ] = data;

  return (
    <MainLayout>
      <Meta
        title="Next Anime"
        image="https://res.cloudinary.com/annnn/image/upload/v1683898263/logo_id1pyr.png"
        description="Next Anime is a free anime watch website built using Consumet API"
      />
      <SlideBanner tredingAnime={tredingAnime} />
      <div className="mt-5 p-4">
        <TitlePrimary title="Recent Anime Episodes" />
        <SwiperContainer
          className="mt-5"
          xl={8.3}
          lg={6.3}
          md={4.3}
          sm={2.3}
          spaceBetween={20}
        >
          {recentAnime?.map((item) => (
            <SwiperSlide key={item?.id}>
              <AnimeCard
                color={item?.color}
                id={item?.id.toString()}
                image={item?.image}
                title={getAnimeTitle(item?.title)}
                type={item?.type}
              />
            </SwiperSlide>
          ))}
        </SwiperContainer>
      </div>
      <ShareNextAnime />
      <NewestComment comments={comments} />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 p-4">
        <BoxShowCase title="Top Airing" anime={topAiringAnime} />
        <BoxShowCase title="Most Popular" anime={mostPopularAnime} />
        <BoxShowCase title="Most Favorite" anime={favouritesAnime?.results} />
        <BoxShowCase title="Completed" anime={completedAnime?.results} />
      </div>
    </MainLayout>
  );
};

export default Home;
