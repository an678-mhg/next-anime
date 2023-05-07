import { Title } from "../types/utils";

const useAnimeTitle = (title: Title) => {
  return title.english || title.native || title.romaji || title.userPreferred;
};

export default useAnimeTitle;
