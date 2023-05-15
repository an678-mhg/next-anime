import { Subtitle } from "@/src/types/utils";
import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

interface SubtitleSettingsProps {
  setSettingsType: React.Dispatch<
    React.SetStateAction<"main" | "playspeed" | "quality" | "subtitle">
  >;
  subtitle: Subtitle[];
  currentSubtitle: number | null;
  handleChangeSubtitle: (index: number) => void;
  handleTurnOffSubtitle: () => void;
}

const SubtitleSettings: React.FC<SubtitleSettingsProps> = ({
  currentSubtitle,
  handleChangeSubtitle,
  setSettingsType,
  subtitle,
  handleTurnOffSubtitle,
}) => {
  return (
    <div className="w-full overflow-y-auto">
      <div
        onClick={() => setSettingsType("main")}
        className="flex items-center space-x-3 p-2 cursor-pointer"
      >
        <AiOutlineLeft size={20} />
        <p className="text-sm font-semibold">Subtitle</p>
      </div>
      <div>
        <div
          onClick={handleTurnOffSubtitle}
          className="p-2 text-sm font-semibold space-x-3 flex items-center cursor-pointer"
        >
          <div className="w-[20px] h-[20px]">
            {currentSubtitle === null && <BsCheckLg size={20} />}
          </div>
          <p>Off</p>
        </div>
        {subtitle?.map((item, index) => (
          <div
            onClick={() => handleChangeSubtitle(index)}
            className="p-2 text-sm font-semibold space-x-3 flex items-center cursor-pointer"
            key={item?.url}
          >
            <div className="w-[20px] h-[20px]">
              {currentSubtitle === index && <BsCheckLg size={20} />}
            </div>
            <p>{item?.lang}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubtitleSettings;
