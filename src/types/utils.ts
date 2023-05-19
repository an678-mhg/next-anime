export interface Layout {
  children: React.ReactNode;
}

export interface AnimeResponse<T> {
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
  totalResults: number;
  results: T[];
}

export interface Title {
  romaji: string;
  english?: string;
  native: string;
  userPreferred: string;
}

export interface Trailer {
  id: string;
  site: string;
  thumbnail: string;
}

export interface SearchAdvancedQuery {
  query?: string;
  type?: "ANIME" | "MANGA";
  page?: number;
  perPage?: number;
  season?: string;
  format?: string;
  sort?: string;
  genres?: string;
  year?: number;
  status?: string;
}

export interface StartDate {
  year: number;
  month: number;
  day: number;
}

export interface EndDate {
  year: any;
  month: any;
  day: any;
}

export interface NextAiringEpisode {
  airingTime: number;
  timeUntilAiring: number;
  episode: number;
}

export interface Character {
  id: number;
  role: string;
  name: Name;
  image: string;
  voiceActors: VoiceActor[];
}

export interface Name {
  first: string;
  last?: string;
  full: string;
  native?: string;
  userPreferred: string;
}

export interface VoiceActor {
  id: number;
  language: string;
  name: Name;
  image: string;
}

export interface Mappings {
  mal: number;
  anidb: number;
  kitsu: number;
  anilist: number;
  thetvdb: number;
  anisearch: number;
  livechart: number;
  "notify.moe": string;
  "anime-planet": string;
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  number: number;
  image: string;
  airDate: string;
}

interface Plyr {
  main: string;
  backup: string;
}

export interface Iframe {
  iframe: string;
  plyr: string;
  nspl: string;
}

export interface Source {
  url: string;
  isM3U8: boolean;
  quality: string;
}

export interface Subtitle {
  url: string;
  lang: string;
}

export interface Filter {
  label: string;
  value: string;
}

export interface Intro {
  start: number;
  end: number;
}
