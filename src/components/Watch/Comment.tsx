import React from "react";
import TitlePrimary from "../Shared/TitlePrimary";
import Input from "../Comment/Input";
import CommentList from "../Comment/CommentList";
import { useQuery } from "react-query";
import { getCommentByEpisodeId } from "@/src/services/comment";
import { CircularProgress } from "react-cssfx-loading";

interface CommentProps {
  animeName: string;
  animeId: string;
}

const Comment: React.FC<CommentProps> = ({ animeName, animeId }) => {
  const { data: comments, isLoading } = useQuery([`comment-${animeId}`], () =>
    getCommentByEpisodeId(animeId)
  );

  return (
    <div className={`mt-5`}>
      <TitlePrimary title="Comments" />
      {comments && !isLoading ? (
        <>
          <Input animeName={animeName} animeId={animeId} />
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
