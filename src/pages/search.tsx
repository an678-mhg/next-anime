import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import SelectFilter from "../components/Search/SelectFilter";
import { useInfiniteQuery } from "react-query";
import { searchAdvanced } from "../services/anime";
import AnimeCard from "../components/Anime/AnimeCard";
import { Anime } from "../types/anime";
import AnimeGridLayout from "../layouts/AnimeGridLayout";
import { InView } from "react-intersection-observer";
import { CircularProgress } from "react-cssfx-loading";
import {
  formatFilter,
  seasonFilter,
  sortFilter,
  statusFilter,
} from "../utils/filter";
import { convertQueryArrayParams } from "../utils/contants";
import AnimeCardSkeleton from "../components/Skeleton/AnimeCardSkeleton";

export interface Queries {
  query: string;
  season: string;
  format: string;
  status: string;
  sort: string;
  genres: string[];
}

const Search = () => {
  const [queries, setQueries] = useState<Queries>({
    query: "",
    season: "",
    format: "",
    status: "",
    sort: "",
    genres: [],
  });

  const { format, genres, query, season, sort, status } = queries;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      [`search-${JSON.stringify(queries)}`],
      (page) => {
        const queries: any = {};

        if (format) {
          queries.format = format;
        }

        if (query) {
          queries.query = query;
        }

        if (season) {
          queries.season = season;
        }

        if (status) {
          queries.status = status;
        }

        if (genres.length > 0) {
          queries.genres = convertQueryArrayParams(genres);
        }

        if (sort) {
          queries.sort = convertQueryArrayParams([sort]);
        }

        return searchAdvanced({
          page: page.pageParam || 1,
          ...queries,
        });
      },
      {
        getNextPageParam: (lastPage) =>
          lastPage.hasNextPage ? (lastPage.currentPage as number) + 1 : null,
      }
    );

  return (
    <MainLayout>
      <div className="p-4 mt-[56px] min-h-screen">
        <h4 className="md:text-4xl text-2xl font-semibold">Search Anime</h4>
        <SelectFilter queries={queries} setQueries={setQueries} />
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
                  title={item.title}
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
              className="my-4 flex w-full items-center justify-center"
            >
              {isFetchingNextPage && <CircularProgress color="#fff" />}
            </div>
          )}
        </InView>
      </div>
    </MainLayout>
  );
};

export default Search;
