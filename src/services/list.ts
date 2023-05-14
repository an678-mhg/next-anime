import axios from "axios";
import { LITS_TYPE } from "@prisma/client";

export interface List {
  animeId: string;
  animeImage: string;
  animeType: string;
  animeColor: string;
  animeTitle: string;
  type: LITS_TYPE;
}

export const createList = async (list: List) => {
  const response = await axios.post<{ status: string }>("/api/list", list);
  return response.data;
};

export const checkAnimeInList = async (animeId: string, type: LITS_TYPE) => {
  const response = await axios.get("/api/list", {
    params: {
      animeId,
      type,
    },
  });

  return response.data;
};
