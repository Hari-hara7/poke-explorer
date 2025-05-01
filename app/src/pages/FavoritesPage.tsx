import React, { useEffect, useState } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import PokemonCard from '../components/PokemonCard';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const [favoritePokemons, setFavoritePokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const data = await Promise.all(
          favorites.map(async (id) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return await res.json();
          })
        );
        setFavoritePokemons(data);
      } catch (err) {
        console.error('Failed to load favorite Pokémon', err);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchFavorites();
    } else {
      setFavoritePokemons([]);
      setLoading(false);
    }
  }, [favorites]);

  if (loading) return <div className="text-center mt-10 text-xl">Loading favorites...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Favorite Pokémon</h1>
      {favoritePokemons.length === 0 ? (
        <p className="text-center text-gray-500">You have no favorite Pokémon yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favoritePokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
