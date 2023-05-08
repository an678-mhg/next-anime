import { useRouter } from "next/router";
import React, { useState } from "react";

const provider = [
  { value: "gogoanime", label: "Gogo" },
  { value: "zoro", label: "Zoro" },
];

const SelectSource = () => {
  const router = useRouter();

  const [selectProvider, setSelectProvider] = useState(
    (router?.query?.provider as string) || provider?.[0].value
  );

  return (
    <div className="flex items-center space-x-3 justify-end">
      <h4 className="text-sm font-semibold">Source:</h4>
      <select
        onChange={(e) => setSelectProvider(e.target.value)}
        value={selectProvider}
        className="bg-[#333] outline-none font-semibold text-white p-2 text-sm w-[200px] rounded-md"
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
