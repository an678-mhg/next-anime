import { Episode } from "@/src/types/utils";
import React from "react";
import TitlePrimary from "../TitlePrimary";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface EpisodeInfoProps {
  episode: Episode;
}

const EpisodeInfo: React.FC<EpisodeInfoProps> = ({ episode }) => {
  return (
    <div className="mt-5">
      <TitlePrimary title={`Episode ${episode?.number}`} />
      <div className="mt-5 flex lg:flex-row flex-col items-start lg:space-x-5">
        <LazyLoadImage className="w-[200px] rounded-md" src={episode?.image} />
        <div className="lg:mt-0 mt-5">
          <h4 className="text-2xl font-semibold">{episode?.title}</h4>
          <p className="text-[14px] font-normal mt-4">{episode?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EpisodeInfo;
