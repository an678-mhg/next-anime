import { Iframe } from "@/src/types/utils";
import React, { useEffect } from "react";

interface SelectIframeProps {
  listIframe: Iframe;
  setIframe: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  iframe: string | null | undefined;
}

const SelectIframe: React.FC<SelectIframeProps> = ({
  iframe,
  listIframe,
  setIframe,
}) => {
  useEffect(() => {
    if (listIframe?.iframe) {
      setIframe(listIframe.iframe);
    }
  }, []);

  return (
    <div className="flex items-center space-x-3 justify-end">
      <h4 className="text-sm font-semibold">Iframe:</h4>
      <select
        onChange={(e) => setIframe(e.target.value)}
        value={iframe! || ""}
        className="bg-[#333] md:flex-auto flex-1 outline-none font-semibold text-white py-2 pl-2 pr-10 text-sm rounded-md"
      >
        {Object.keys(listIframe)?.map((item) => (
          <option
            className="text-sm font-semibold bg-[#333]"
            // @ts-ignore
            key={listIframe[item]}
            // @ts-ignore
            value={listIframe[item]}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectIframe;
