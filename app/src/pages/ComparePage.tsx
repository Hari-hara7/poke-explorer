import React, { useState, useEffect } from 'react';  // Import useEffect here
import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../types/pokemon';
import PokemonCard from '../components/PokemonCard';
import CompareTool from '../components/CompareTool';
import { useFavorites } from '../contexts/FavoritesContext';

const ComparePage: React.FC = () => {
  const [selectedPokemon1, setSelectedPokemon1] = useState<Pokemon | null>(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState<Pokemon | null>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const { favorites } = useFavorites();

  const navigate = useNavigate();

  // Fetch Pokémon data (you can use a fetch API here)
  useEffect(() => {
    const fetchPokemons = async () => {
      const fetchedPokemons = await Promise.all(
        favorites.map(async (id) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          return await res.json();
        })
      );
      setPokemons(fetchedPokemons);
    };

    fetchPokemons();
  }, [favorites]);

  const handleSelect = (pokemon: Pokemon, setSelected: React.Dispatch<React.SetStateAction<Pokemon | null>>) => {
    if (!selectedPokemon1) {
      setSelected(pokemon);
    } else if (selectedPokemon1 && !selectedPokemon2) {
      setSelected(pokemon);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Compare Pokémon</h1>
      <div className="flex justify-between mb-8">
        <div>
          <h2 className="font-semibold mb-2">Select Pokémon 1</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {pokemons.map((pokemon) => (
              <div key={pokemon.id} onClick={() => handleSelect(pokemon, setSelectedPokemon1)}>
                <PokemonCard pokemon={pokemon} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Select Pokémon 2</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {pokemons.map((pokemon) => (
              <div key={pokemon.id} onClick={() => handleSelect(pokemon, setSelectedPokemon2)}>
                <PokemonCard pokemon={pokemon} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <CompareTool pokemon1={selectedPokemon1} pokemon2={selectedPokemon2} />
    </div>
  );
};

export default ComparePage;
