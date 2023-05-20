import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FcDocument } from "react-icons/fc";
import { Comment } from "@/src/types/comment";
import { calculateCreatedTime } from "@/src/utils/contants";
import Link from "next/link";
import path from "@/src/utils/path";

interface NewestCommentItemProps {
  comment: Comment;
}

const NewestCommentItem: React.FC<NewestCommentItemProps> = ({ comment }) => {
  return (
    <div className="h-[230px] rounded-md bg-[#121315] p-4 flex flex-col justify-between">
      <div>
        <div className="space-x-3 flex items-center">
          <LazyLoadImage
            src={comment?.user?.image!}
            effect="blur"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-xs font-semibold">
            <p>{comment.user?.name}</p>
            <p className="text-xs text-gray-500">
              {calculateCreatedTime(comment.createdAt)}
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs line-clamp-3">{comment.text}</p>
      </div>
      <Link
        href={path.watch(comment.animeId)}
        className="text-xs flex items-center font-semibold text-primary space-x-2"
      >
        <FcDocument />
        <span>Watch now</span>
      </Link>
    </div>
  );
};

export default NewestCommentItem;
