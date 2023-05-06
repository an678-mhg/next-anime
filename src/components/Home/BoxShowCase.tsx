import { Anime } from "@/src/types/anime";
import path from "@/src/utils/path";
import Link from "next/link";
import React from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { BsFillCalendarDateFill, BsFillPlayCircleFill } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
          <Link
            href={path.anime(item?.id)}
            className="p-3 border border-gray-600 flex space-x-4"
            key={item?.id}
          >
            <LazyLoadImage
              effect="blur"
              className="rounded-md w-[60px] aspect-[9/16]"
              src={item?.image}
            />
            <div className="text-sm flex-1">
              <h5 className="text-sm font-semibold line-clamp-1">
                {item?.title?.english || item?.title?.userPreferred}
              </h5>
              <div className="flex items-center space-x-3 mt-2">
                {item?.type && (
                  <p className="flex items-center space-x-2 text-sm">
                    <BsFillPlayCircleFill />
                    <span className="text-xs">{item?.type}</span>
                  </p>
                )}
                {item?.duration && (
                  <p className="flex items-center space-x-2 text-sm">
                    <AiFillClockCircle />
                    <span className="text-xs">{item?.duration}m</span>
                  </p>
                )}
                {item?.releaseDate && (
                  <p className="flex items-center space-x-2 text-sm">
                    <BsFillCalendarDateFill />
                    <span className="text-xs">{item?.releaseDate}</span>
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BoxShowCase;
