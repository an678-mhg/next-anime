import { playSpeedOptions } from "@/src/utils/contants";
import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

interface PlaySpeedSettingsProps {
  setSettingsType: React.Dispatch<
    React.SetStateAction<"main" | "playspeed" | "quality" | "subtitle">
  >;
  currentPlaySpeed: number;
  handleChangePlaySpeed: (index: number, value: number) => void;
}

const PlaySpeedSettings: React.FC<PlaySpeedSettingsProps> = ({
  setSettingsType,
  currentPlaySpeed,
  handleChangePlaySpeed,
}) => {
  return (
    <div className="w-full">
      <div
        onClick={() => setSettingsType("main")}
        className="flex items-center space-x-3 p-2 cursor-pointer"
      >
        <AiOutlineLeft size={20} />
        <p className="text-sm font-semibold">Play speed</p>
      </div>
      <div>
        {playSpeedOptions?.map((item, index) => (
          <div
            className="p-2 text-sm font-semibold space-x-3 flex items-center cursor-pointer"
            key={item?.value}
            onClick={() => handleChangePlaySpeed(index, item?.value)}
          >
            <div className="w-[20px] h-[20px]">
              {currentPlaySpeed === index && <BsCheckLg size={20} />}
            </div>
            <p>{item?.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaySpeedSettings;
