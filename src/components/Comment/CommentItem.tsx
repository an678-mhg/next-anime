import { deleteComment, likeComment } from "@/src/services/comment";
import { Comment } from "@/src/types/comment";
import { calculateCreatedTime } from "@/src/utils/contants";
import React from "react";
import { CircularProgress } from "react-cssfx-loading";
import { BiTrashAlt } from "react-icons/bi";
import { BsDot, BsReplyFill } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMutation, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { toast } from "react-hot-toast";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const queryClient = useQueryClient();
  const { data } = useSession();

  const key = `comment-${comment?.animeId}`;

  const { mutateAsync, isLoading } = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient?.setQueryData(
        key,
        (queryClient?.getQueryData(key) as Comment[]).filter(
          (item) => item.id !== comment.id
        )
      );
    },
  });

  const { mutateAsync: likeCommentMutate } = useMutation(likeComment);

  const handleDelete = () => {
    if (!window.confirm("Are you sure delete comment!")) {
      return;
    }

    mutateAsync(comment?.id);
  };

  const handleLikeComment = () => {
    if (!data?.user?.id) {
      return toast.error("Login first!");
    }

    queryClient.setQueryData(
      key,
      (queryClient.getQueryData(key) as Comment[]).map((item) => {
        if (item.id === comment.id) {
          return {
            ...item,
            isLiked: !item.isLiked,
            _count: {
              ...item._count,
              like: item.isLiked ? item._count.like - 1 : item._count.like + 1,
            },
          };
        }

        return item;
      })
    );

    likeCommentMutate({ commentId: comment.id, userId: data?.user?.id! });
  };

  return (
    <div>
      <div className="flex space-x-4">
        <LazyLoadImage
          effect="blur"
          src={comment.user?.image!}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-end">
            <h4 className="font-semibold text-sm">{comment?.user?.name}</h4>

            <BsDot className="text-gray-600" size={20} />
            <p className="text-[13px] text-gray-400">
              {calculateCreatedTime(comment.createdAt)}
            </p>
          </div>
          <p className="text-[13px] mt-1">{comment.text}</p>
        </div>
      </div>
      <div className="ml-[calc(32px+16px)] mt-2 flex items-center space-x-3 text-gray-400">
        <div
          onClick={handleLikeComment}
          className="flex items-center space-x-2 cursor-pointer"
        >
          {!comment?.isLiked ? <AiOutlineLike /> : <AiFillLike />}
          <span className="text-xs">{comment?._count?.like}</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <BsReplyFill />
          <span className="text-xs">0</span>
        </div>
        {data?.user?.id === comment.userId && (
          <button
            disabled={isLoading}
            onClick={handleDelete}
            className="flex items-center space-x-2 cursor-pointer"
          >
            {!isLoading ? (
              <BiTrashAlt />
            ) : (
              <CircularProgress color="#fff" width={16} height={16} />
            )}
            <span className="text-xs">Remove</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
