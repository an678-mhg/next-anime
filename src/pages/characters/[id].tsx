import AnimeCard from "@/src/components/Anime/AnimeCard";
import AnimeGridLayout from "@/src/layouts/AnimeGridLayout";
import MainLayout from "@/src/layouts/MainLayout";
import { getCharactersInfo } from "@/src/services/characters";
import { Characters } from "@/src/types/characters";
import { getAnimeTitle } from "@/src/utils/contants";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface CharactersProps {
  info: Characters;
}

const Characters: React.FC<CharactersProps> = ({ info }) => {
  return (
    <MainLayout>
      <div className="mt-[56px] p-4 container min-h-screen">
        <div className="flex md:space-x-6 md:flex-row flex-col">
          <LazyLoadImage
            className="w-[200px] rounded-sm"
            src={info?.image}
            effect="blur"
          />
          <div className="md:mt-0 mt-5">
            <h4 className="md:text-4xl text-2xl font-semibold">
              {info?.name?.full}
            </h4>
            <div className="mt-5 space-y-2">
              <p>
                <span className="font-semibold">Gender: </span>
                <span>{info?.gender}</span>
              </p>
              <p>
                <span className="font-semibold">Date of birth: </span>
                <span>
                  {info?.dateOfBirth?.day}/{info?.dateOfBirth?.month}
                </span>
              </p>
              <p>
                <span className="font-semibold">Gender: </span>
                <span>{info?.gender}</span>
              </p>
              <p>
                <span className="font-semibold">Age: </span>
                <span>{info?.age}</span>
              </p>
              <p>
                <span className="font-semibold">Height: </span>
                <span>{info?.height}</span>
              </p>
            </div>
          </div>
        </div>
        <AnimeGridLayout title="Related" className="mt-5">
          {info?.relations?.map((item) => (
            <AnimeCard
              color={item?.color}
              id={item.id.toString()}
              image={item.image}
              title={getAnimeTitle(item.title)}
              type={item.type}
              key={item.id}
            />
          ))}
        </AnimeGridLayout>
      </div>
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
    const info = await getCharactersInfo(context.params?.id as string);

    return {
      props: {
        info,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
};

export default Characters;
