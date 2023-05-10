import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/router";
import path from "../utils/path";

const Search = () => {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query?.trim()) {
      return;
    }
    router?.push(path?.results(query));
  };

  return (
    <MainLayout>
      <form
        onSubmit={handleSearch}
        className="w-full h-screen flex items-center justify-center"
      >
        <div className="w-[1000px] max-w-full px-4">
          <h1 className="md:text-4xl text-2xl font-semibold w-full text-center">
            Search Anime
          </h1>

          <div className="flex mt-8 items-center justify-center bg-[#333] w-full rounded-md overflow-hidden">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Typing here..."
              className="py-2 flex-1 bg-transparent outline-none px-4"
            />
            <div className="px-4 py-2 h-full bg-[#CAE962] flex items-center justify-center">
              <CiSearch color="black" size={25} />
            </div>
          </div>
        </div>
      </form>
    </MainLayout>
  );
};

export default Search;
