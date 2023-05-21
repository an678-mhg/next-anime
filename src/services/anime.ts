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
import prisma from "../lib/prisma";
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
  const response = await client.get<AnimeInfo>(`/info/${id}`, {
    params: {
      provider,
    },
  });

  return response.data;
};

export const getAnimeEpisodeStreaming = async (
  episodeId: string,
  provider: string = "zoro"
): Promise<AnimeEpisodeStreaming> => {
  let response;

  if (provider === "zoro") {
    response = await client.get<AnimeEpisodeStreaming>(`/watch/${episodeId}`, {
      params: {
        provider,
      },
    });
    return response.data;
  } else {
    response = await axios.get<Streaming>(
      `${process.env.NEXT_PUBLIC_AVM_STREAM_URL}${episodeId}`
    );

    const data = response.data;

    return {
      iframe: {
        iframe: data?.data?.iframe?.default,
        nspl: data?.data?.nspl.main,
        plyr: data?.data?.plyr.main,
      },
      sources: [
        data?.data?.stream?.multi?.backup,
        data?.data?.stream?.multi?.main,
      ],
    };
  }
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
    getTrendingAnime(20),
    getTopAiring(5),
    getMostPopular(5),
    searchAdvanced({
      sort: convertQueryArrayParams(["FAVOURITES_DESC"]),
      type: "ANIME",
      perPage: 5,
    }),
    searchAdvanced({
      type: "ANIME",
      status: "FINISHED",
      perPage: 5,
      sort: convertQueryArrayParams(["SCORE_DESC"]),
    }),
    getNewestComment(),
  ]);

  return data;
};

export const getWatchPage = async (id: string, provider: string) => {
  const data = await Promise.all([
    getAnimeInfo(id, provider),
    prisma?.comment?.findMany({
      where: {
        animeId: id,
      },
      include: {
        user: true,
      },
    }),
  ]);

  return data;
};
