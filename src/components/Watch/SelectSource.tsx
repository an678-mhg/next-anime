import path from "@/src/utils/path";
import { useRouter } from "next/router";
import React from "react";

const provider = [
  { value: "gogoanime", label: "Gogo" },
  { value: "zoro", label: "Zoro" },
];

interface SelectSourceProps {
  idAnime: string;
}

const SelectSource: React.FC<SelectSourceProps> = ({ idAnime }) => {
  const router = useRouter();

  return (
    <div className="flex items-center space-x-3 justify-end">
      <h4 className="text-sm font-semibold">Source:</h4>
      <select
        onChange={(e) => {
          router?.push(path?.watch(idAnime, e.target?.value));
        }}
        value={router?.query?.provider}
        className="bg-[#333] md:flex-auto flex-1 outline-none font-semibold text-white py-2 pl-2 pr-10 text-sm rounded-md"
      >
        {provider?.map((item) => (
          <option
            className="text-sm font-semibold bg-[#333]"
            key={item?.value}
            value={item.value}
          >
            {item?.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectSource;
