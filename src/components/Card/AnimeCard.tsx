import path from "@/src/utils/path";
import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface AnimeCardProps {
  title: string;
  type: string;
  image: string;
  id: string;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ image, title, type, id }) => {
  return (
    <Link href={path.anime(id)}>
      <div className="rounded-md overflow-hidden relative">
        <LazyLoadImage
          width="100%"
          src={image}
          effect="blur"
          className="aspect-[124/185]"
        />
        <div className="bg-[#2A2C31] p-2 mt-[-6px]">
          <h3 className="text-sm font-semibold line-clamp-1">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
