import { Comment } from "@/src/types/comment";
import React from "react";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="mt-5 space-y-3">
      {comments?.length === 0 && (
        <h5 className="text-sm font-semibold text-center mt-5">
          No comment yet
        </h5>
      )}
      {comments?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
