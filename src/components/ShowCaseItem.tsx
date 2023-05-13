import React from "react";
import { getAnimeTitle } from "../utils/contants";
import { BsFillCalendarDateFill, BsFillPlayCircleFill } from "react-icons/bs";
import path from "../utils/path";
import { Title } from "../types/utils";
import { AiFillClockCircle } from "react-icons/ai";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface ShowCaseItemProps {
  id: string;
  image: string;
  title: Title;
  type?: string;
  duration?: number;
  releaseDate?: number;
  border?: boolean;
  color: string;
}

const ShowCaseItem: React.FC<ShowCaseItemProps> = ({
  duration,
  id,
  image,
  releaseDate,
  title,
  type,
  border = true,
  color,
}) => {
  return (
    <Link
      href={path.anime(id)}
      className={`${border && "p-3"} flex space-x-4`}
      key={id}
    >
      <LazyLoadImage
        effect="blur"
        className="rounded-sm w-[64px] aspect-[124/185]"
        src={image}
      />
      <div className="text-sm flex-1">
        <h5 style={{ color }} className="text-sm font-semibold line-clamp-1">
          {getAnimeTitle(title)}
        </h5>
        <div className="flex items-center space-x-3 mt-2">
          {type && (
            <p className="flex items-center space-x-2 text-sm">
              <BsFillPlayCircleFill />
              <span className="text-xs">{type}</span>
            </p>
          )}
          {duration && (
            <p className="flex items-center space-x-2 text-sm">
              <AiFillClockCircle />
              <span className="text-xs">{duration}m</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ShowCaseItem;
