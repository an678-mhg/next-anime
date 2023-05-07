import { Anime } from "@/src/types/anime";
import React from "react";
import ShowCaseItem from "../ShowCaseItem";

interface BoxShowCaseProps {
  title: string;
  anime: Anime[];
}

const BoxShowCase: React.FC<BoxShowCaseProps> = ({ title, anime }) => {
  return (
    <div>
      <h3 className="font-semibold text-[16px] text-[#CAE962] bg-[#4A4B51] p-3">
        {title}
      </h3>
      <div className="bg-[#414248]">
        {anime?.map((item) => (
          <ShowCaseItem
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
