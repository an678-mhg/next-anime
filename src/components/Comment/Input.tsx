import path from "@/src/utils/path";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiOutlineSend } from "react-icons/ai";
import { useMutation } from "react-query";
import { createComment } from "@/src/services/comment";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { CircularProgress } from "react-cssfx-loading";
import { CreateCommentBody } from "@/src/types/comment";
import { Comment } from "@prisma/client";
import { Comment as CommentType } from "@/src/types/comment";

interface InputProps {
  setCommentStates: React.Dispatch<React.SetStateAction<CommentType[]>>;
}

const Input: React.FC<InputProps> = ({ setCommentStates }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [text, setText] = useState("");

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
      };

      setText("");
      setCommentStates((prev) => [...prev, comment]);
    },
  });

  const handleCreateComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user) return;

    if (!text.trim()) return;

    const newComment: CreateCommentBody = {
      animeId: router?.query?.id as string,
      text,
      userId: session?.user?.id,
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
          <LazyLoadImage
            className="w-7 h-7 rounded-full"
            src={session?.user?.image!}
            effect="blur"
          />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Leave a comment...."
            className="font-semibold bg-transparent flex-1 outline-none py-2"
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
