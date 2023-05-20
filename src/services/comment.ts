import axios from "axios";
import { CreateCommentBody } from "../types/comment";

export const createComment = async (comment: CreateCommentBody) => {
  const response = await axios.post("/api/comment", comment);
  return response.data;
};
