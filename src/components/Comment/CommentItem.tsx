import { Comment } from "@/src/types/comment";
import { calculateCreatedTime } from "@/src/utils/contants";
import React from "react";
import { BsDot } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="flex space-x-4">
      <LazyLoadImage
        effect="blur"
        src={comment.user?.image!}
        className="w-10 h-10 rounded-full mt-1"
      />
      <div className="flex-1">
        <div className="flex items-end">
          <h4 className="font-semibold">{comment?.user?.name}</h4>
          <BsDot className="text-gray-600" size={20} />
          <p className="text-gray-400 text-sm">User</p>
          <BsDot className="text-gray-600" size={20} />
          <p className="text-sm text-gray-400">
            {calculateCreatedTime(comment.createdAt)}
          </p>
        </div>
        <p className="text-sm text-gray-400 mt-1">{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
