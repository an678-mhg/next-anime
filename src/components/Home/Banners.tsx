import { Anime } from "@/src/types/anime";
import React from "react";
import { BsFillPlayCircleFill, BsFillCalendarDateFill } from "react-icons/bs";
import { AiFillClockCircle, AiOutlineRight } from "react-icons/ai";
import { GrStatusDisabledSmall } from "react-icons/gr";
import Link from "next/link";
import GenresItem from "../GenresItem";
import { LazyLoadImage } from "react-lazy-load-image-component";
import path from "@/src/utils/path";
import { getAnimeTitle, setBackgroundImage } from "@/src/utils/contants";

interface BannersProps {
  anime: Anime;
}

const Banners: React.FC<BannersProps> = ({ anime }) => {
  return (
    <div
      style={setBackgroundImage(anime?.cover)}
      className="lg:aspect-[3/1.4] md:aspect-[3/2] aspect-[1/0.8] w-full banner"
    >
      <div className="z-[999] absolute md:top-[50%] md:translate-y-[-50%] bottom-0 md:bottom-auto p-4 w-full left-[50%] translate-x-[-50%] flex items-center justify-between space-x-8">
        <div className="flex-1">
          <h3 className="md:text-4xl text:2xl font-semibold lg:line-clamp-2 line-clamp-1">
            {getAnimeTitle(anime?.title)}
          </h3>
          <div className="flex items-center space-x-4 mt-4">
            {anime?.type && (
              <p className="flex items-center space-x-2 text-sm">
                <BsFillPlayCircleFill />
                <span>{anime?.type}</span>
              </p>
            )}
            {anime?.duration && (
              <p className="flex items-center space-x-2 text-sm">
                <AiFillClockCircle />
                <span>{anime?.duration}m</span>
              </p>
            )}
            {anime?.releaseDate && (
              <p className="flex items-center space-x-2 text-sm">
                <BsFillCalendarDateFill />
                <span>{anime?.releaseDate}</span>
              </p>
            )}
            {anime?.status && (
              <p className="flex items-center space-x-2 text-sm">
                <GrStatusDisabledSmall />
                <span>{anime?.status}</span>
              </p>
            )}
          </div>
          <div className="mt-5 space-x-4">
            {anime?.genres?.slice(0, 3)?.map((item) => (
              <GenresItem key={item} genres={item} />
            ))}
          </div>
          <div
            className="text-[14px] font-normal mt-4 lg:line-clamp-5 md:line-clamp-4 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: anime?.description }}
          />
          <div className="space-x-4 flex items-center mt-5">
            <Link
              className="text-black bg-[#cae962] px-4 py-2 rounded-full flex items-center space-x-2"
              href={path.watch(anime?.id)}
            >
              <BsFillPlayCircleFill className="md:text-sm text-lg" />
              <span className="font-semibold text-sm">Watch now</span>
            </Link>
            <Link
              className="text-white bg-gray-500 px-4 py-2 rounded-full flex items-center space-x-2"
              href={path.anime(anime?.id)}
            >
              <span className="font-semibold text-sm">Detail</span>
              <AiOutlineRight className="md:text-sm text-lg" />
            </Link>
          </div>
        </div>
        <div className="lg:block hidden">
          <LazyLoadImage
            effect="blur"
            className="rounded-md w-[250px]"
            src={anime.image}
          />
        </div>
      </div>
    </div>
  );
};

export default Banners;
