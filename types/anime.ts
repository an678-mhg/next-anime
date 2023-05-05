import { Title, Trailer } from "./utils";

export interface RecentAnime {
  id: string;
  malId: number;
  title: Title;
  image: string;
  rating?: number;
  color: string;
  episodeId: string;
  episodeTitle: string;
  episodeNumber: number;
  genres: string[];
  type: string;
}

export interface Anime {
  id: string;
  malId: number;
  title: Title;
  image: string;
  trailer: Trailer;
  description: string;
  status: string;
  cover: string;
  rating: number;
  releaseDate: number;
  color: string;
  genres: string[];
  totalEpisodes: number;
  duration: number;
  type: string;
}
