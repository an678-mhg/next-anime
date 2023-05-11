import { genresFilter } from "@/src/utils/filter";
import React from "react";
import { BsCheck2 } from "react-icons/bs";

interface GenresProps {
  handleChangeGenres: (item: string) => void;
  genresIsCheck: (item: string) => boolean;
}

const Genres: React.FC<GenresProps> = ({
  handleChangeGenres,
  genresIsCheck,
}) => {
  return (
    <div className="flex items-center space-x-4 overflow-x-auto mt-5">
      {genresFilter?.map((item) => (
        <p
          onClick={() => handleChangeGenres(item.value)}
          className="border cursor-pointer border-white flex items-center space-x-3 p-2 text-sm flex-2 rounded-md"
          key={item?.value}
        >
          {item?.label} {genresIsCheck(item.value) && <BsCheck2 size={20} />}
        </p>
      ))}
    </div>
  );
};

export default Genres;
