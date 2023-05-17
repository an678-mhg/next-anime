import React from "react";
import TitlePrimary from "../TitlePrimary";

const Note = () => {
  return (
    <div className="mt-5">
      <TitlePrimary title="Note" />
      <p className="text-[14px] font-normal mt-4">
        {
          "If you can't see the movie, try f5 again, change the source, or use an iframe"
        }
      </p>
    </div>
  );
};

export default Note;
