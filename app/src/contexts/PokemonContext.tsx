import React, { createContext, useState, useEffect } from 'react';
import { Pokemon } from '../types/pokemon';

interface PokemonContextType {
  pokemons: Pokemon[];
  loading: boolean;
  error: boolean;
}

export const PokemonContext = createContext<PokemonContextType | null>(null);

export const PokemonProvider: React.FC = ({ children }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: any) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        setPokemons(pokemonDetails);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemons, loading, error }}>
      {children}
    </PokemonContext.Provider>
  );
};
