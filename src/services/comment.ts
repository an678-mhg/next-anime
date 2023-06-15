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

export const getCommentByEpisodeId = async (animeId: string) => {
  const response = await axios.put<Comment[]>("/api/comment", {
    animeId,
  });
  return response.data;
};

export const deleteComment = async (id: string) => {
  const response = await axios.delete(`/api/comment?id=${id}`);
  return response.data;
};

export const likeComment = async ({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string;
}) => {
  const response = await axios.post("/api/like-comment", { commentId, userId });
  return response.data;
};
