export interface Streaming {
  status: number;
  message: string;
  data: Data;
}

export interface Data {
  id: string;
  episodes: string;
  stream: Stream;
  iframe: Iframe;
  plyr: Plyr;
  nspl: Nspl;
}

export interface Stream {
  multi: Multi;
  tracks: Tracks;
}

export interface Multi {
  main: Main;
  backup: Backup;
}

export interface Main {
  url: string;
  isM3U8: boolean;
  quality: string;
}

export interface Backup {
  url: string;
  isM3U8: boolean;
  quality: string;
}

export interface Tracks {
  file: string;
  kind: string;
}

export interface Iframe {
  default: string;
  backup: string;
}

export interface Plyr {
  main: string;
  backup: string;
}

export interface Nspl {
  main: string;
  backup: string;
}
