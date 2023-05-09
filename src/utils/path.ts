const path = {
  watch: (id: string, provider: string = "gogoanime") => {
    return `/watch/${id}?provider=${provider}`;
  },
  anime: (id: string) => {
    return `/anime/${id}`;
  },
  home: "/",
};

export default path;
