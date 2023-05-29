import { Characters } from "../types/characters";
import client from "../utils/client";

export const getCharactersInfo = async (id: string) => {
  const response = await client.get<Characters>(`/character/${id}`);
  return response.data;
};
