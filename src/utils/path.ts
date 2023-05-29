const path = {
  watch: (id: string, provider: string = "gogoanime") => {
    return `/anime/watch/${id}?provider=${provider}`;
  },
  anime: (id: string) => {
    return `/anime/${id}`;
  },
  home: "/",
  search: "/search",
  results: (query: string) => `/results?q=${query}`,
  signIn: "/sign-in",
  list: "/list",
  genres: (genres: string) => `/anime/genres/${genres}`,
  characters: (id: string) => `/characters/${id}`,
};

export default path;
