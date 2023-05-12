import React from "react";
import TitlePrimary from "../TitlePrimary";
import { AnimeInfo } from "@/src/types/anime";
import { getAnimeTitle, setBackgroundImage } from "@/src/utils/contants";
import GenresItem from "../GenresItem";
import Link from "next/link";
import path from "@/src/utils/path";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";

interface RandomAnimeProps {
  anime: AnimeInfo;
}

const RandomAnime: React.FC<RandomAnimeProps> = ({ anime }) => {
  return (
    <div className="p-4 mt-5">
      <TitlePrimary title="Random Anime" />
      <div
        style={setBackgroundImage(anime?.cover)}
        className="h-[300px] w-full mt-5 relative rounded-md"
      >
        <div className="absolute inset-0 bg-[#0000006a]"></div>
        <div className="absolute inset-0 p-4 z-[9]">
          <h4 className="font-semibold line-clamp-2">
            {getAnimeTitle(anime?.title)}
          </h4>
          <div className="mt-3 space-x-4">
            {anime?.genres?.slice(0, 3)?.map((item) => (
              <GenresItem key={item} genres={item} />
            ))}
          </div>
          <div
            className="md:text-[14px] text-xs font-normal mt-4 line-clamp-6"
            dangerouslySetInnerHTML={{ __html: anime?.description }}
          />
          <div className="space-x-4 flex items-center mt-5">
            <Link
              className="bg-primary px-4 py-2 rounded-full flex items-center space-x-2"
              href={path.watch(anime?.id)}
            >
              <BsFillPlayCircleFill className="md:text-sm text-lg" />
              <span className="font-semibold md:text-sm text-xs">
                Watch now
              </span>
            </Link>
            <Link
              className="text-white bg-gray-500 px-4 py-2 rounded-full flex items-center space-x-2"
              href={path.anime(anime?.id)}
            >
              <span className="font-semibold md:text-sm text-xs">Detail</span>
              <AiOutlineRight className="md:text-sm text-lg" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomAnime;
