import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FcDocument } from "react-icons/fc";

const NewestCommentItem = () => {
  return (
    <div className="h-[230px] rounded-md bg-[#121315] p-4 flex flex-col justify-between">
      <div>
        <div className="space-x-3 flex items-center">
          <LazyLoadImage
            src={
              "https://img.zorores.com/_r/100x100/100/avatar/one_piece/user-00.jpeg"
            }
            effect="blur"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-xs font-semibold">
            <p>Zoro nef</p>
            <p className="text-xs text-gray-500">Just now</p>
          </div>
        </div>
        <p className="mt-3 text-xs line-clamp-3">
          Adventure is good thou but , but banging and jiggle jiggle ecchi
          missing
        </p>
      </div>
      <div className="text-xs flex items-center font-semibold text-[#CAE962] space-x-2">
        <FcDocument />
        <span>One Piece</span>
      </div>
    </div>
  );
};

export default NewestCommentItem;
