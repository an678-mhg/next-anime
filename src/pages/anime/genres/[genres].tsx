import AnimeCard from "@/src/components/Anime/AnimeCard";
import Meta from "@/src/components/Shared/Meta";
import AnimeCardSkeleton from "@/src/components/Skeleton/AnimeCardSkeleton";
import AnimeGridLayout from "@/src/layouts/AnimeGridLayout";
import MainLayout from "@/src/layouts/MainLayout";
import { searchAdvanced } from "@/src/services/anime";
import { Anime } from "@/src/types/anime";
import { convertQueryArrayParams, getAnimeTitle } from "@/src/utils/contants";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { CircularProgress } from "react-cssfx-loading";
import { InView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";

interface GenresProps {
  genres: string;
}

const Genres: React.FC<GenresProps> = ({ genres }) => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery(
    [`genres-${genres}`],
    (pageParam) =>
      searchAdvanced({
        genres: convertQueryArrayParams([genres]),
        page: pageParam?.pageParam || 1,
      }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? (lastPage.currentPage as number) + 1 : null,
    }
  );

  return (
    <MainLayout>
      <Meta
        title={genres}
        image="https://res.cloudinary.com/annnn/image/upload/v1683898263/logo_id1pyr.png"
        description="Next Anime is a free anime watch website built using Consumet API"
      />
      <div className="min-h-screen mt-[56px] px-4 pb-4 container">
        <h4 className="md:text-4xl text-2xl font-semibold capitalize">
          {genres}
        </h4>

        {isError && (
          <h6 className="mt-5 font-semibold text-center">
            Something went wrong
          </h6>
        )}
        {data?.pages?.length === 0 ||
          (data?.pages[0]?.results?.length === 0 && (
            <h6 className="mt-5 font-semibold text-center">No results</h6>
          ))}
        {isLoading && (
          <AnimeGridLayout className="mt-5">
            {Array.from(Array(20).keys()).map((item) => (
              <AnimeCardSkeleton key={item} />
            ))}
          </AnimeGridLayout>
        )}

        <AnimeGridLayout className="mt-5">
          {data &&
            data?.pages
              ?.reduce((final, item) => {
                // @ts-ignore
                final.push(...item.results);
                return final;
              }, [] as Anime[])
              .map((item) => (
                <AnimeCard
                  color={item.color}
                  id={item.id}
                  image={item.image}
                  title={getAnimeTitle(item.title)}
                  type={item.type}
                  key={item.id}
                />
              ))}
        </AnimeGridLayout>

        <InView
          fallbackInView
          onChange={(InVidew) => {
            if (InVidew && hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        >
          {({ ref }) => (
            <div
              ref={ref}
              className="mt-8 flex w-full items-center justify-center"
            >
              {isFetchingNextPage && <CircularProgress color="#fff" />}
            </div>
          )}
        </InView>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      genres: context?.params?.genres,
    },
  };
};

export default Genres;
