import { Anime, AnimeInfo, RecentAnime } from "@/src/types/anime";
import { AnimeResponse, SearchAdvancedQuery } from "@/src/types/utils";
import client from "@/src/utils/client";

const default_provider = "gogoanime";

export const getRecentAnime = async (limit: number = 5, page: number = 1) => {
  const response = await client.get<AnimeResponse<RecentAnime>>(
    "/recent-episodes",
    {
      params: {
        page: page,
        perPage: limit,
        provider: default_provider,
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
      provider: default_provider,
    },
  });

  return response.data.results;
};

export const getTopAiring = async (limit: number = 5, page: number = 1) => {
  const response = await client.get<AnimeResponse<Anime>>("/airing-schedule", {
    params: {
      page,
      perPage: limit,
      provider: default_provider,
    },
  });

  return response.data.results;
};

export const getMostPopular = async (limit: number = 5, page: number = 1) => {
  const response = await client.get<AnimeResponse<Anime>>("/popular", {
    params: {
      page,
      perPage: limit,
      provider: default_provider,
    },
  });

  return response.data.results;
};

export const searchAdvanced = async (queries: SearchAdvancedQuery) => {
  const response = await client.get<AnimeResponse<Anime>>("/advanced-search", {
    params: {
      ...queries,
      provider: default_provider,
    },
  });

  return response.data.results;
};

export const getAnimeInfo = async (id: string) => {
  const response = await client.get<AnimeInfo>(`/info/${id}`, {
    params: {
      provider: default_provider,
    },
  });

  return response.data;
};
