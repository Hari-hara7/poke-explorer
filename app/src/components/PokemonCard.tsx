import { Pokemon } from "../types/pokemon";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  return (
    <div className="bg-white shadow-md rounded p-4 flex flex-col items-center">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-20 h-20 mb-2" />
      <h2 className="text-lg font-bold capitalize">{pokemon.name}</h2>
      <p className="text-gray-600">ID: {pokemon.id}</p>
      <div className="flex gap-2 mt-2">
        {pokemon.types.map((typeInfo) => (
          <span
            key={typeInfo.type.name}
            className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full capitalize"
          >
            {typeInfo.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
