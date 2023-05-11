import {
  formatFilter,
  seasonFilter,
  sortFilter,
  statusFilter,
} from "@/src/utils/filter";
import React, { ChangeEvent, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Genres from "./Genres";
import { Queries } from "@/src/pages/search";

interface SelectFilterProps {
  queries: Queries;
  setQueries: React.Dispatch<React.SetStateAction<Queries>>;
}

const SelectFilter: React.FC<SelectFilterProps> = ({ queries, setQueries }) => {
  const timeout = useRef<any>();
  const [queryTmp, setQueryTmp] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setQueries({ ...queries, [name]: value });
  };

  const handleOnChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQueryTmp(value);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      setQueries({ ...queries, query: value });
    }, 300);
  };

  const handleChangeGenres = (item: string) => {
    if (queries?.genres?.some((value) => value === item)) {
      return setQueries({
        ...queries,
        genres: queries?.genres?.filter((value) => value !== item),
      });
    }

    setQueries({ ...queries, genres: [...queries?.genres, item] });
  };

  const genresIsCheck = (item: string) => {
    return queries?.genres?.some((value) => value === item);
  };

  return (
    <div>
      <div className="mt-5 flex items-center space-x-5 w-full overflow-x-auto">
        <div className="flex flex-col">
          <label className="font-semibold">Search</label>
          <div className="border space-x-2 bg-[#222] border-white mt-3 rounded-[4px] overflow-hidden flex items-center pl-2">
            <CiSearch size={20} />
            <input
              name="query"
              onChange={handleOnChangeQuery}
              value={queryTmp}
              className="flex-1 text-sm pr-2 outline-none py-2 bg-transparent"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Season</label>
          <div className="border space-x-2 w-[200px] bg-[#222] border-white mt-3 rounded-[4px] overflow-hidden flex items-center pl-2">
            <select
              onChange={handleOnChange}
              name="season"
              value={queries?.season}
              className="flex-1 text-sm pr-2 outline-none py-2 bg-transparent"
            >
              {seasonFilter?.map((item) => (
                <option
                  value={item.value}
                  key={item?.value}
                  className="bg-[#333]"
                >
                  {item?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Format</label>
          <div className="border space-x-2 w-[200px] bg-[#222] border-white mt-3 rounded-[4px] overflow-hidden flex items-center pl-2">
            <select
              onChange={handleOnChange}
              name="format"
              value={queries?.format}
              className="flex-1 text-sm pr-2 outline-none py-2 bg-transparent"
            >
              {formatFilter?.map((item) => (
                <option
                  value={item.value}
                  key={item?.value}
                  className="bg-[#333]"
                >
                  {item?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Status</label>
          <div className="border space-x-2 w-[200px] bg-[#222] border-white mt-3 rounded-[4px] overflow-hidden flex items-center pl-2">
            <select
              onChange={handleOnChange}
              name="status"
              value={queries?.status}
              className="flex-1 text-sm pr-2 outline-none py-2 bg-transparent"
            >
              {statusFilter?.map((item) => (
                <option
                  value={item.value}
                  key={item?.value}
                  className="bg-[#333]"
                >
                  {item?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Sort</label>
          <div className="border space-x-2 w-[200px] bg-[#222] border-white mt-3 rounded-[4px] overflow-hidden flex items-center pl-2">
            <select
              onChange={handleOnChange}
              name="sort"
              value={queries?.sort}
              className="flex-1 text-sm pr-2 outline-none py-2 bg-transparent"
            >
              {sortFilter?.map((item) => (
                <option
                  value={item.value}
                  key={item?.value}
                  className="bg-[#333]"
                >
                  {item?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Genres
        genresIsCheck={genresIsCheck}
        handleChangeGenres={handleChangeGenres}
      />
    </div>
  );
};

export default SelectFilter;
