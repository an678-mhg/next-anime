import Link from "next/link";
import React from "react";

interface GenresItemProps {
  genres: string;
}

const GenresItem: React.FC<GenresItemProps> = ({ genres }) => {
  return (
    <Link
      className="text-xs font-semibold border border-white px-2 py-1 text-center rounded-full"
      href="/abc"
    >
      {genres}
    </Link>
  );
};

export default GenresItem;
