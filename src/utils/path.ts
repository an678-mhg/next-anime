const path = {
  watch: (id: string) => {
    return `/watch/${id}`;
  },
  anime: (id: string) => {
    return `/anime/${id}`;
  },
  home: "/",
};

export default path;
