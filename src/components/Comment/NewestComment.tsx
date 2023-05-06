import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import NewestCommentItem from "./NewestCommentItem";

const NewestComment = () => {
  const [showComment, setShowComment] = useState(true);

  return (
    <div className="mt-5 flex overflow-hidden">
      {showComment && (
        <div className="xl:block hidden">
          <LazyLoadImage width={400} effect="blur" src="/zoro.png" />
        </div>
      )}
      <div className="flex-1 p-4 flex items-center">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="text-[#CAE962] border border-[#CAE962] px-4 py-2 rounded-full text-xs font-semibold">
              Newest Comment
            </div>
            <div className="space-x-4 flex items-center justify-center">
              <label className="text-sm">Show</label>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={showComment}
                  onChange={() => setShowComment((prev) => !prev)}
                />
                <span className="slider round" />
              </label>
            </div>
          </div>
          {showComment && (
            <div className="md:grid-cols-4 grid-cols-2 grid mt-8 gap-4">
              <NewestCommentItem />
              <NewestCommentItem />
              <NewestCommentItem />
              <NewestCommentItem />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewestComment;
