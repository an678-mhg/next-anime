import React from "react";
import TitlePrimary from "../TitlePrimary";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getAnimeTitle } from "@/src/utils/contants";
import { NextAiringEpisode, Title } from "@/src/types/utils";
import { BsFillCalendarDateFill, BsFillPlayCircleFill } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";
import dayjs from "dayjs";

interface AnimeInfoProps {
  image: string;
  title: Title;
  type: string;
  duration: number;
  releaseDate: number;
  description: string;
  nextAiringEpisode: NextAiringEpisode;
}

const AnimeInfo: React.FC<AnimeInfoProps> = ({
  duration,
  image,
  releaseDate,
  title,
  type,
  description,
  nextAiringEpisode,
}) => {
  return (
    <div className="mt-5">
      <TitlePrimary title="Info" />
      <div className="mt-5 flex lg:space-x-5 lg:flex-row flex-col">
        <LazyLoadImage
          effect="blur"
          src={image}
          className="w-[200px] rounded-md"
        />
        <div className="flex-1 lg:mt-0 mt-5">
          <h6 className="text-2xl font-semibold">{getAnimeTitle(title)}</h6>
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
            {releaseDate && (
              <p className="flex items-center space-x-2 text-sm">
                <BsFillCalendarDateFill />
                <span className="text-xs">{releaseDate}</span>
              </p>
            )}
          </div>
          <div
            className="text-[14px] font-normal mt-4"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {nextAiringEpisode?.airingTime && nextAiringEpisode?.episode && (
            <p className="mt-5 font-semibold text-sm">
              Watch episode {nextAiringEpisode?.episode} on the day{" "}
              {dayjs(nextAiringEpisode?.airingTime * 1000).format("DD/MM/YYYY")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeInfo;
