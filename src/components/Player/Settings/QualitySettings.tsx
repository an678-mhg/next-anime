import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { Source } from "../index";
import { BsCheckLg } from "react-icons/bs";

interface QualitySettingsProps {
  setSettingsType: React.Dispatch<
    React.SetStateAction<"main" | "playspeed" | "quality" | "subtitle">
  >;
  source: Source[];
  currentSource: number;
  handleChangeSource: (index: number) => void;
}

const QualitySettings: React.FC<QualitySettingsProps> = ({
  setSettingsType,
  source,
  currentSource,
  handleChangeSource,
}) => {
  return (
    <div className="w-full overflow-y-auto">
      <div
        onClick={() => setSettingsType("main")}
        className="flex items-center space-x-3 p-2 cursor-pointer"
      >
        <AiOutlineLeft size={20} />
        <p className="text-sm font-semibold">Quality</p>
      </div>
      <div>
        {source?.map((item, index) => (
          <div
            onClick={() => handleChangeSource(index)}
            className="p-2 text-sm font-semibold space-x-3 flex items-center cursor-pointer"
            key={item?.url}
          >
            <div className="w-[20px] h-[20px]">
              {currentSource === index && <BsCheckLg size={20} />}
            </div>
            <p>{item?.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QualitySettings;
