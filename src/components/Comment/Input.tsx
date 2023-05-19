import path from "@/src/utils/path";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiOutlineSend } from "react-icons/ai";

const Input = () => {
  const { data: session } = useSession();

  return (
    <div className="mt-5 rounded-sm overflow-hidden">
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
            placeholder="Leave a comment...."
            className="font-semibold bg-transparent flex-1 outline-none py-2"
          />
          <AiOutlineSend className="cursor-pointer" size={20} />
        </div>
      )}
    </div>
  );
};

export default Input;
