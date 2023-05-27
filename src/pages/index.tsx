import BoxShowCase from "@/src/components/Home/BoxShowCase";
import MainLayout from "@/src/layouts/MainLayout";
import { getAnimeTitle } from "@/src/utils/contants";
import AnimeCard from "../components/Anime/AnimeCard";
import Meta from "../components/Meta";
import TitlePrimary from "../components/TitlePrimary";
import { SwiperSlide } from "swiper/react";
import { useQuery } from "react-query";
import { getHomePage } from "../services/anime";
import NotFound from "../components/404NotFound";
import SlideBanner from "../components/Home/SlideBanner";
import SwiperContainer from "../components/SwiperContainer";
import NewestComment from "../components/Comment/NewestComment";

const Home = () => {
  const { data, isLoading, isError } = useQuery("home", getHomePage);

  if (isError) {
    return <NotFound />;
  }

  if (!data || isLoading) {
    return (
      <div className="w-full h-screen relative flex items-center justify-center bg-black">
        <Meta
          title="Next Anime"
          image="https://res.cloudinary.com/annnn/image/upload/v1683898263/logo_id1pyr.png"
          description="Next Anime is a free anime watch website built using Consumet API"
        />
        <img src="/logo-svg.svg" className="w-[100px]" />
      </div>
    );
  }

  const [
    recentAnime,
    tredingAnime,
    mostPopularAnime,
    favouritesAnime,
    completedAnime,
    comments,
    fall,
    winter,
    spring,
    summer,
  ] = data;

  return (
    <MainLayout>
      <Meta
        title="Next Anime"
        image="https://res.cloudinary.com/annnn/image/upload/v1683898263/logo_id1pyr.png"
        description="Next Anime is a free anime watch website built using Consumet API"
      />
      <SlideBanner tredingAnime={tredingAnime} />
      <div className="mt-5 p-4 container">
        <TitlePrimary title="Recent Anime" />
        <SwiperContainer
          className="mt-5"
          xl={6.3}
          lg={6.3}
          md={4.3}
          sm={2.3}
          spaceBetween={15}
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
      <div className="mt-5 p-4 container">
        <TitlePrimary title="Popular Anime" />
        <SwiperContainer
          className="mt-5"
          xl={6.3}
          lg={6.3}
          md={4.3}
          sm={2.3}
          spaceBetween={15}
        >
          {mostPopularAnime?.map((item) => (
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
      <div className="mt-5 p-4 container">
        <TitlePrimary title="Favorite Anime" />
        <SwiperContainer
          className="mt-5"
          xl={6.3}
          lg={6.3}
          md={4.3}
          sm={2.3}
          spaceBetween={15}
        >
          {favouritesAnime?.results?.map((item) => (
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
      <div className="mt-5 p-4 container">
        <TitlePrimary title="Completed Anime" />
        <SwiperContainer
          className="mt-5"
          xl={6.3}
          lg={6.3}
          md={4.3}
          sm={2.3}
          spaceBetween={15}
        >
          {completedAnime?.results?.map((item) => (
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
      <div className="px-4 container">
        {comments.length > 0 && <NewestComment comments={comments} />}
        <div className="py-5 mt-5">
          <TitlePrimary title="Upcoming Season" />
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 pt-5">
            <BoxShowCase title="Fall" anime={fall?.results} />
            <BoxShowCase title="Winter" anime={winter?.results} />
            <BoxShowCase title="Summer" anime={summer?.results} />
            <BoxShowCase title="Spring" anime={spring?.results} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
