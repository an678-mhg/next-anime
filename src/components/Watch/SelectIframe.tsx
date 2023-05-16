import React from "react";

interface SelectIframeProps {
  isWatchIframe: boolean;
  setIsWatchIframe: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectIframe: React.FC<SelectIframeProps> = ({
  setIsWatchIframe,
  isWatchIframe,
}) => {
  return (
    <div className="flex items-center space-x-3 justify-end mt-3">
      <h4 className="text-sm font-semibold">Iframe:</h4>
      <button
        onClick={() => setIsWatchIframe((prev) => !prev)}
        className="bg-[#333] outline-none font-semibold text-white p-2 text-sm w-[200px] rounded-md"
      >
        {!isWatchIframe ? "Use iframe to watch" : "Turn off iframe"}
      </button>
    </div>
  );
};

export default SelectIframe;
