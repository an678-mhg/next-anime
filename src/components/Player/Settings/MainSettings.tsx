import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { MdOutlineHighQuality, MdOutlineSubtitles } from "react-icons/md";
import { SiSpeedtest } from "react-icons/si";

interface MainSettingsProps {
  setSettingsType: React.Dispatch<
    React.SetStateAction<"main" | "playspeed" | "quality" | "subtitle">
  >;
  currentSpeed: string;
  currentQuality: string;
  currentSubtitle: string | undefined;
  haveSubtitle: boolean;
  haveQuality: boolean;
}

const MainSettings: React.FC<MainSettingsProps> = ({
  setSettingsType,
  currentQuality,
  currentSpeed,
  currentSubtitle,
  haveQuality,
  haveSubtitle,
}) => {
  return (
    <div className="w-full">
      <div
        onClick={() => setSettingsType("playspeed")}
        className="flex items-center justify-between cursor-pointer p-2 space-x-3"
      >
        <div className="flex items-center space-x-3">
          <SiSpeedtest size={20} />
          <p className="text-sm font-semibold">Play speed</p>
        </div>
        <div className="flex items-center space-x-3">
          <p className="text-sm font-semibold line-clamp-1">{currentSpeed}</p>
          <AiOutlineRight size={20} />
        </div>
      </div>
      {haveQuality && (
        <div
          onClick={() => setSettingsType("quality")}
          className="flex items-center justify-between cursor-pointer p-2 space-x-3"
        >
          <div className="flex items-center space-x-3">
            <MdOutlineHighQuality size={20} />
            <p className="text-sm font-semibold">Quality</p>
          </div>
          <div className="flex items-center space-x-3">
            <p className="text-sm font-semibold line-clamp-1">
              {currentQuality}
            </p>
            <AiOutlineRight size={20} />
          </div>
        </div>
      )}
      {haveSubtitle && (
        <div
          onClick={() => setSettingsType("subtitle")}
          className="flex items-center justify-between cursor-pointer p-2 space-x-3"
        >
          <div className="flex items-center space-x-3">
            <MdOutlineSubtitles size={20} />
            <p className="text-sm font-semibold">Subtitle</p>
          </div>
          <div className="flex items-center space-x-3">
            <p className="text-sm font-semibold line-clamp-1">
              {currentSubtitle}
            </p>
            <AiOutlineRight size={20} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainSettings;
