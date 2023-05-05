import { Anime, RecentAnime } from "@/types/anime";
import { AnimeResponse, SearchAdvancedQuery } from "@/types/utils";
import client from "@/utils/client";
import qs from "qs";

export const getRecentAnime = async (limit: number = 5, page: number = 1) => {
  const response = await client.get<AnimeResponse<RecentAnime>>(
    "/recent-episodes",
    {
      params: {
        page: page,
        perPage: limit,
        provider: "gogoanime",
      },
    }
  );

  return response.data.results;
};

export const getTrendingAnime = async (limit: number = 5, page: number = 1) => {
  const response = await client.get<AnimeResponse<Anime>>("/trending", {
    params: {
      page,
      perPage: limit,
      provider: "gogoanime",
    },
  });

  return response.data.results;
};

export const getTopAiring = async (limit: number = 5, page: number = 1) => {
  const response = await client.get<AnimeResponse<Anime>>("/airing-schedule", {
    params: {
      page,
      perPage: limit,
      provider: "gogoanime",
    },
  });

  return response.data.results;
};

export const getMostPopular = async (limit: number = 5, page: number = 1) => {
  const response = await client.get<AnimeResponse<Anime>>("/popular", {
    params: {
      page,
      perPage: limit,
      provider: "gogoanime",
    },
  });

  return response.data.results;
};

export const searchAdvanced = async (queries: SearchAdvancedQuery) => {
  const response = await client.get<AnimeResponse<Anime>>("/advanced-search", {
    params: {
      ...queries,
      provider: "gogoanime",
    },
  });

  return response.data.results;
};
