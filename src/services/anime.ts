import {
  Anime,
  AnimeEpisodeStreaming,
  AnimeInfo,
  RecentAnime,
} from "@/src/types/anime";
import { AnimeResponse, SearchAdvancedQuery } from "@/src/types/utils";
import client from "@/src/utils/client";
import { convertQueryArrayParams } from "../utils/contants";
import axios from "axios";
import { Streaming } from "../types/amvstr";
import { getNewestComment } from "./comment";

export const default_provider = "gogoanime";

export const getRecentAnime = async (limit: number = 20, page: number = 1) => {
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

export const getTrendingAnime = async (
  limit: number = 20,
  page: number = 1
) => {
  const response = await client.get<AnimeResponse<Anime>>("/trending", {
    params: {
      page,
      perPage: limit,
      provider: default_provider,
    },
  });

  return response.data.results;
};

export const getTopAiring = async (limit: number = 20, page: number = 1) => {
  const response = await client.get<AnimeResponse<Anime>>("/airing-schedule", {
    params: {
      page,
      perPage: limit,
      provider: default_provider,
    },
  });

  return response.data.results;
};

export const getMostPopular = async (limit: number = 20, page: number = 1) => {
  const response = await client.get<AnimeResponse<Anime>>("/popular", {
    params: {
      page,
      perPage: limit,
      provider: default_provider,
    },
  });

  return response.data.results;
};

export const searchAdvanced = async (queries?: SearchAdvancedQuery) => {
  const response = await client.get<AnimeResponse<Anime>>("/advanced-search", {
    params: {
      ...queries,
      provider: default_provider,
    },
  });

  return response.data;
};

export const getAnimeInfo = async (
  id: string,
  provider: string = default_provider
) => {
  const response = await client.get<AnimeInfo>(`/info/${id}`);

  return response.data;
};

export const getAnimeEpisodeStreaming = async (
  episodeId: string
): Promise<AnimeEpisodeStreaming> => {
  const response = await client.get(`/watch/${episodeId}`)
  return response?.data
};

export const searchAnime = async (query: string, page: number = 1) => {
  const response = await client.get<AnimeResponse<Anime>>(`/${query}`, {
    params: page,
  });
  return response.data;
};

export const getRandomAnime = async () => {
  const response = await client.get<AnimeInfo>("/random-anime");
  return response.data;
};

export const getHomePage = async () => {
  const data = await Promise.all([
    getRecentAnime(),
    getTrendingAnime(),
    getMostPopular(),
    searchAdvanced({
      sort: convertQueryArrayParams(["FAVOURITES_DESC"]),
      type: "ANIME",
    }),
    searchAdvanced({
      type: "ANIME",
      status: "FINISHED",
      sort: convertQueryArrayParams(["SCORE_DESC"]),
    }),
    getNewestComment(),
    searchAdvanced({
      season: "FALL",
      perPage: 5,
    }),
    searchAdvanced({
      season: "WINTER",
      perPage: 5,
    }),
    searchAdvanced({
      season: "SPRING",
      perPage: 5,
    }),
    searchAdvanced({
      season: "SUMMER",
      perPage: 5,
    }),
  ]);

  return data;
};
