const path = {
  watch: (id: string, provider: string = "gogoanime") => {
    return `/watch/${id}?provider=${provider}`;
  },
  anime: (id: string) => {
    return `/anime/${id}`;
  },
  home: "/",
  search: "/search",
  results: (query: string) => `/results?q=${query}`,
  signIn: "/sign-in",
  list: "/list",
};

export default path;
