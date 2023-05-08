import { Recommendation, Relation } from "@/src/types/anime";
import React, { useState } from "react";
import ShowCaseItem from "../ShowCaseItem";

interface MoreLikeThisProps {
  relations: Relation[];
  recommendations: Recommendation[];
}

const MoreLikeThis: React.FC<MoreLikeThisProps> = ({
  recommendations,
  relations,
}) => {
  const [selectType, setSelectType] = useState("Related");
  const moreLikeThis = selectType === "Related" ? relations : recommendations;

  return (
    <div className="md:w-[402px] w-full mt-5">
      <div className="space-x-4">
        {["Related", "Recommendations"].map((item) => (
          <button
            className={`${
              selectType === item
                ? "bg-[#cae962] text-black"
                : "bg-[#333] text-white"
            } rounded-md px-4 py-2 text-sm font-semibold outline-none`}
            key={item}
            onClick={() => setSelectType(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-5 space-y-5">
        {moreLikeThis?.map((item) => (
          <ShowCaseItem
            key={item.id}
            id={item?.id.toString()}
            image={item?.image}
            title={item?.title}
            type={item?.type}
            border={false}
          />
        ))}
      </div>
    </div>
  );
};

export default MoreLikeThis;
