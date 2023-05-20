import React from "react";
import TitlePrimary from "../TitlePrimary";
import Input from "../Comment/Input";
import { Comment } from "@/src/types/comment";
import CommentList from "../Comment/CommentList";

interface CommentProps {
  comments: Comment[];
  setCommentStates: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const Comment: React.FC<CommentProps> = ({ comments, setCommentStates }) => {
  return (
    <div className="mt-5">
      <TitlePrimary title="Comments" />
      <Input setCommentStates={setCommentStates} />
      <CommentList comments={comments} />
    </div>
  );
};

export default Comment;
