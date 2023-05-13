import React from "react";
import TitlePrimary from "../TitlePrimary";
import { Character } from "../../types/utils";
import CharacterCard from "./CharacterCard";

interface CharactersListProps {
  characters: Character[];
}

const CharactersList: React.FC<CharactersListProps> = ({ characters }) => {
  return (
    <div className="p-4">
      <TitlePrimary title="Characters" />
      <div className="grid lg:grid-cols-4 gap-3 mt-5 md:grid-cols-2 grid-cols-1">
        {characters?.map((item) => (
          <CharacterCard character={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default CharactersList;
