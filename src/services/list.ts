import axios from "axios";
import { StringDecoder } from "string_decoder";

export interface List {
  animeId: string;
  animeImage: string;
  animeType: string;
  animeColor: string;
  animeTitle: string;
}

export const createList = async (list: List) => {
  const response = await axios.post<{ status: string }>("/api/list", list);
  return response.data;
};

export const checkAnimeInList = async (animeId: String) => {
  const response = await axios.get("/api/list", {
    params: {
      animeId,
    },
  });

  return response.data;
};
