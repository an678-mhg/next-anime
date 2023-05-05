import { Anime } from "@/types/anime";
import React from "react";
import { BsFillPlayCircleFill, BsFillCalendarDateFill } from "react-icons/bs";
import { AiFillClockCircle, AiOutlineRight } from "react-icons/ai";
import { GrStatusDisabledSmall } from "react-icons/gr";
import Link from "next/link";
import GenresItem from "../GenresItem";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface BannersProps {
  anime: Anime;
}

const Banners: React.FC<BannersProps> = ({ anime }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${anime?.cover})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="lg:aspect-[3/1.3] md:aspect-[3/2] aspect-[1/1] w-full banner"
    >
      <div className="z-[999] absolute top-[50%] translate-y-[-50%] p-4 w-full left-[50%] translate-x-[-50%] flex items-center justify-between space-x-8">
        <div className="flex-1">
          <h3 className="md:text-4xl text:2xl font-semibold line-clamp-2">
            {anime?.title?.english || anime?.title?.userPreferred}
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
            className="text-[14px] font-normal mt-4 lg:line-clamp-5 md:line-clamp-4 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: anime?.description }}
          />
          <div className="space-x-4 flex items-center mt-5">
            <Link
              className="text-black bg-[#cae962] md:px-4 px-2 py-2 md:rounded-full rounded-md flex items-center space-x-2"
              href="/abc"
            >
              <BsFillPlayCircleFill className="md:text-sm text-lg" />
              <span className="font-semibold md:block hidden">Watch now</span>
            </Link>
            <Link
              className="text-white bg-gray-500 md:px-4 px-2 py-2 md:rounded-full rounded-md flex items-center md:space-x-2"
              href="/abc"
            >
              <span className="font-semibold md:block hidden">Detail</span>
              <AiOutlineRight className="md:text-sm text-lg" />
            </Link>
          </div>
        </div>
        <div className="md:block hidden">
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
