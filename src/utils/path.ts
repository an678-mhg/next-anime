const path = {
  watch: (id: string, episodeId?: string) => {
    return episodeId ? `/watch/${id}?episodeId=${episodeId}` : `/watch/${id}`;
  },
  anime: (id: string) => {
    return `/anime/${id}`;
  },
  home: "/",
};

export default path;
