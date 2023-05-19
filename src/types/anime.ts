import {
  Character,
  EndDate,
  Episode,
  Iframe,
  Intro,
  Mappings,
  NextAiringEpisode,
  Source,
  StartDate,
  Subtitle,
  Title,
  Trailer,
} from "./utils";

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

export interface AnimeInfo {
  id: string;
  title: Title;
  malId: number;
  synonyms: string[];
  isLicensed: boolean;
  isAdult: boolean;
  countryOfOrigin: string;
  image: string;
  popularity: number;
  color: string;
  cover: string;
  description: string;
  status: string;
  releaseDate: number;
  startDate: StartDate;
  endDate: EndDate;
  nextAiringEpisode: NextAiringEpisode;
  totalEpisodes: number;
  currentEpisode: number;
  rating: number;
  duration: number;
  genres: string[];
  season: string;
  studios: string[];
  subOrDub: string;
  type: string;
  recommendations: Recommendation[];
  characters: Character[];
  relations: Relation[];
  mappings: Mappings;
  episodes: Episode[];
}

export interface Recommendation {
  id: number;
  malId: number;
  title: Title;
  status: string;
  episodes: number;
  image: string;
  cover: string;
  rating: number;
  type: string;
}

export interface Relation {
  id: number;
  relationType: string;
  malId?: number;
  title: Title;
  status: string;
  episodes?: number;
  image: string;
  color: string;
  type: string;
  cover: string;
  rating: number;
}

export interface AnimeEpisodeStreaming {
  iframe?: Iframe;
  sources: Source[];
  download?: string;
  subtitles?: Subtitle[];
  intro?: Intro;
}
