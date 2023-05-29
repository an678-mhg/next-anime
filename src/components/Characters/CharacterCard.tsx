import { Character } from "@/src/types/utils";
import path from "@/src/utils/path";
import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <Link
      href={path.characters(character.id.toString())}
      className="flex items-center"
    >
      <LazyLoadImage
        src={character?.image}
        className="w-[64px] aspect-[9/16]"
        effect="blur"
      />
      <div className="flex-1 bg-[#222] hover:bg-[#333] h-full transition-colors p-4 flex flex-col justify-between">
        <h4 className="font-semibold">{character?.name?.full}</h4>
        <p className="font-normal text-sm">{character?.role}</p>
      </div>
    </Link>
  );
};

export default CharacterCard;
