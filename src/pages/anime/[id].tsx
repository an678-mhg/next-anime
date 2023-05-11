import AnimeBannerDetail from "@/src/components/Anime/AnimeBannerDetail";
import AnimeInfoDetail from "@/src/components/Anime/AnimeInfoDetail";
import AnimeCard from "@/src/components/Anime/AnimeCard";
import AnimeGridLayout from "@/src/layouts/AnimeGridLayout";
import MainLayout from "@/src/layouts/MainLayout";
import { getAnimeInfo } from "@/src/services/anime";
import { AnimeInfo } from "@/src/types/anime";
import { setBackgroundImage } from "@/src/utils/contants";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";

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
        <AnimeBannerDetail info={info} />
      </div>

      <div className="md:hidden block md:mt-0 mt-8">
        <AnimeInfoDetail info={info} />
      </div>

      {info?.relations?.length > 0 && (
        <AnimeGridLayout title="Relations for anime" className="p-4 mt-5">
          {info?.relations?.map((item) => (
            <AnimeCard
              color={item?.color}
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
        <AnimeGridLayout title="Recommended for you" className="p-4">
          {info?.recommendations?.map((item) => (
            <AnimeCard
              color={"#fff"}
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
