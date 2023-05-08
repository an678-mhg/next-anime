import { Episode } from "@/src/types/utils";
import React from "react";

interface EpisodeListProps {
  episodes: Episode[];
  episodeId: string;
  animeId: string;
  handleSelectEpisode: (episode: Episode) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodeId,
  episodes,
  handleSelectEpisode,
}) => {
  return (
    <div className="flex space-x-4 w-full overflow-x-auto mt-5">
      {episodes?.map((item) => (
        <button
          key={item.id}
          className={`${
            episodeId === item.id
              ? "bg-[#cae962] text-black"
              : "bg-[#333] text-white"
          } px-4 py-2 text-center cursor-pointer rounded-md text-sm font-semibold`}
          onClick={() => handleSelectEpisode(item)}
        >
          {item.number}
        </button>
      ))}
    </div>
  );
};

export default EpisodeList;
