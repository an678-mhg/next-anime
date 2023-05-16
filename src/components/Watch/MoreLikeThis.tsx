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
  const [selectType, setSelectType] = useState("recommendations");
  const moreLikeThis = selectType === "related" ? relations : recommendations;

  return (
    <div className="lg:w-[500px] w-full p-4 lg:bg-[#222]">
      <div className="space-x-4">
        {["recommendations", "related"].map((item) => (
          <button
            className={`${
              selectType === item ? "bg-primary" : "bg-[#333]"
            } rounded-md px-4 py-2 capitalize text-sm font-semibold outline-none`}
            key={item}
            onClick={() => setSelectType(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-5 space-y-5">
        {moreLikeThis.length === 0 && (
          <h6 className="text-sm font-semibold text-gray-500">
            No {selectType} found!
          </h6>
        )}
        {moreLikeThis?.map((item) => (
          <ShowCaseItem
            // @ts-ignore
            color={item?.color || "#fff"}
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
