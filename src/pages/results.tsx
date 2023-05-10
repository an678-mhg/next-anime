import { useRouter } from "next/router";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { searchAnime } from "../services/anime";

const Results = () => {
  const router = useRouter();

  const q = router?.query?.q as string;

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      [`search-${q}`],
      (page) => {
        if (!q.trim()) return null;
        return searchAnime(q, page?.pageParam);
      },
      {
        getNextPageParam: (lastPage) => {
          return (lastPage?.currentPage as number) + 1;
        },
      }
    );

  return <div>Results</div>;
};

export default Results;
