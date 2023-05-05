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
  season?: "WINTER" | "SPRING" | "SUMMER" | "FALL";
  format?: "TV" | "TV_SHORT" | "OVA" | "ONA" | "MOVIE" | "SPECIAL" | "MUSIC";
  sort?: string;
  genres?: string;
  year?: number;
  status?:
    | "RELEASING"
    | "NOT_YET_RELEASED"
    | "FINISHED"
    | "CANCELLED"
    | "HIATUS";
}
