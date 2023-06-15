import path from "@/src/utils/path";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { AiOutlineSend } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { createComment } from "@/src/services/comment";
import { toast } from "react-hot-toast";
import { CircularProgress } from "react-cssfx-loading";
import { CreateCommentBody } from "@/src/types/comment";
import { Comment } from "@prisma/client";
import { Comment as CommentType } from "@/src/types/comment";
import { MdMessage } from "react-icons/md";

interface InputProps {
  animeId: string;
  animeName: string;
}

const Input: React.FC<InputProps> = ({ animeId, animeName }) => {
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(createComment, {
    onError: () => {
      toast.error("Failed to create new comment");
    },
    onSuccess: (response: Comment) => {
      const comment: CommentType = {
        animeId: response.animeId,
        createdAt: response.createdAt,
        id: response.id,
        text: response.text,
        user: {
          name: session?.user?.name!,
          email: session?.user?.email!,
          emailVerified: null,
          id: session?.user?.id!,
          image: session?.user?.image!,
        },
        userId: response.userId,
        animeName,
        _count: {
          like: 0,
        },
        isLiked: false,
      };

      setText("");

      const key = `comment-${animeId}`;

      queryClient.setQueriesData(
        [key],
        [...(queryClient.getQueryData(key) as Comment[]), comment]
      );
    },
  });

  const handleCreateComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user) return;

    if (!text.trim()) return;

    const newComment: CreateCommentBody = {
      animeId,
      text,
      userId: session?.user?.id,
      animeName,
    };

    mutateAsync(newComment);
  };

  return (
    <form
      onSubmit={handleCreateComment}
      className="mt-5 rounded-sm overflow-hidden"
    >
      {!session?.user ? (
        <div className="bg-[#222] px-4 py-2">
          <h3>
            You must{" "}
            <Link className="text-primary underline" href={path.signIn}>
              login
            </Link>{" "}
            to comment
          </h3>
        </div>
      ) : (
        <div className="bg-[#222] px-2 flex items-center space-x-4">
          <MdMessage className="cursor-pointer" size={20} />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Leave a comment...."
            className="font-semibold text-sm bg-transparent flex-1 outline-none py-2"
          />
          <button disabled={isLoading}>
            {!isLoading ? (
              <AiOutlineSend className="cursor-pointer" size={20} />
            ) : (
              <CircularProgress color="#fff" width={20} height={20} />
            )}
          </button>
        </div>
      )}
    </form>
  );
};

export default Input;
