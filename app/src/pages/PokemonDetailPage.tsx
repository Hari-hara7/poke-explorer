import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }, base_stat: number }[];
  sprites: {
    front_default: string;
    front_shiny: string;
    other?: {
      'official-artwork'?: {
        front_default?: string;
      };
    };
  };
}

const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error('Failed to fetch Pokémon');
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError('Error loading Pokémon');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;
  if (!pokemon) return <div className="text-center mt-10">No Pokémon data found.</div>;

  const isFavorite = favorites.includes(pokemon.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow-lg">
        <img
          src={
            pokemon.sprites.other?.['official-artwork']?.front_default ||
            pokemon.sprites.front_default
          }
          alt={pokemon.name}
          className="w-48 h-48 object-contain"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold capitalize mb-2">{pokemon.name}</h1>
          <p className="mb-1">Height: {pokemon.height}</p>
          <p className="mb-1">Weight: {pokemon.weight}</p>
          <p className="mb-1">
            Types: {pokemon.types.map((t) => t.type.name).join(', ')}
          </p>
          <p className="mb-1">
            Abilities: {pokemon.abilities.map((a) => a.ability.name).join(', ')}
          </p>
          <div className="mt-4">
            <h2 className="font-semibold text-lg mb-2">Stats</h2>
            <ul className="grid grid-cols-2 gap-x-4">
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name} className="mb-1 capitalize">
                  {stat.stat.name}: <strong>{stat.base_stat}</strong>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => toggleFavorite(pokemon.id)}
            className={`mt-4 px-4 py-2 rounded text-white ${
              isFavorite ? 'bg-red-500' : 'bg-blue-500'
            }`}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
