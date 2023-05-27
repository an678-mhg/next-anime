import React, { useEffect } from "react";
import TitlePrimary from "../TitlePrimary";
import Input from "../Comment/Input";
import CommentList from "../Comment/CommentList";
import { useQuery } from "react-query";
import { getCommentByEpisodeId } from "@/src/services/comment";
import { useInView } from "react-intersection-observer";
import { CircularProgress } from "react-cssfx-loading";

interface CommentProps {
  episodeId: string;
  animeId: string;
}

const Comment: React.FC<CommentProps> = ({ episodeId, animeId }) => {
  const { data: comments, isLoading } = useQuery([`comment-${episodeId}`], () =>
    getCommentByEpisodeId(episodeId, animeId)
  );

  return (
    <div className={`mt-5`}>
      <TitlePrimary title="Comments" />
      {comments && !isLoading ? (
        <>
          <Input episodeId={episodeId} animeId={animeId} />
          <CommentList comments={comments} />
        </>
      ) : (
        <div className="w-full flex justify-center my-5">
          <CircularProgress color="#FF0000" />
        </div>
      )}
    </div>
  );
};

export default Comment;
