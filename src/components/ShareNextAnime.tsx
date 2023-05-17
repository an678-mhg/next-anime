import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ShareSocial from "./ShareSocial";

const ShareNextAnime = () => {
  return (
    <div className="bg-[#121315] px-4 mt-5 md:py-0 py-4 flex items-center md:justify-start justify-between md:space-x-5">
      <div className="md:block hidden">
        <LazyLoadImage
          width={100}
          height={100}
          effect="blur"
          src="/luffy.gif"
        />
      </div>
      <div className="text-sm ">
        <h4 className="text-primary font-semibold">Share Next Anime</h4>
        <p>to your friends</p>
      </div>
      <ShareSocial
        link={process.env.NEXT_PUBLIC_NEXT_ANIME_URL as string}
        title="Next Anime"
      />
    </div>
  );
};

export default ShareNextAnime;
