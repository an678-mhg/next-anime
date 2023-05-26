import React, { useEffect } from "react";

interface SelectIframeProps {
  listIframe: string[];
  setIframe: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  iframe: string | null | undefined;
}

const SelectIframe: React.FC<SelectIframeProps> = ({
  iframe,
  listIframe,
  setIframe,
}) => {
  useEffect(() => {
    if (listIframe?.[0]) {
      setIframe(listIframe?.[0]);
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
        {listIframe?.map((item, index) => (
          <option
            className="text-sm font-semibold bg-[#333]"
            key={index}
            value={item}
          >
            {index}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectIframe;
