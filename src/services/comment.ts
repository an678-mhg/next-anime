import axios from "axios";
import { Comment, CreateCommentBody } from "../types/comment";

export const createComment = async (comment: CreateCommentBody) => {
  const response = await axios.post("/api/comment", comment);
  return response.data;
};

export const getNewestComment = async () => {
  const response = await axios.get<Comment[]>("/api/comment");
  return response.data;
};
