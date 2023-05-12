import { Anime } from "@/src/types/anime";
import React from "react";
import ShowCaseItem from "../ShowCaseItem";

interface BoxShowCaseProps {
  title: string;
  anime: Anime[];
}

const BoxShowCase: React.FC<BoxShowCaseProps> = ({ title, anime }) => {
  return (
    <div className="rounded-md overflow-hidden">
      <h3 className="font-semibold text-[16px] text-primary bg-[#222] p-3">
        {title}
      </h3>
      <div className="bg-[#222]">
        {anime?.map((item) => (
          <ShowCaseItem
            color={item?.color}
            key={item.id}
            duration={item?.duration}
            id={item?.id}
            image={item?.image}
            releaseDate={item?.releaseDate}
            title={item?.title}
            type={item?.type}
          />
        ))}
      </div>
    </div>
  );
};

export default BoxShowCase;
