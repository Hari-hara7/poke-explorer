import { useEffect, useState } from "react";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import TypeFilter from "./components/TypeFilter";
import { Pokemon } from "./types/pokemon";

const App = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: any) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        setPokemons(pokemonDetails);
        setFilteredPokemons(pokemonDetails);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    let filtered = pokemons;

    if (search) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.some(t => t.type.name === selectedType)
      );
    }

    setFilteredPokemons(filtered);
  }, [search, selectedType, pokemons]);

  const uniqueTypes = Array.from(
    new Set(pokemons.flatMap(p => p.types.map(t => t.type.name)))
  );

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Something went wrong!</div>;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-4 max-w-5xl mx-auto">
        <SearchBar search={search} setSearch={setSearch} />
        <TypeFilter types={uniqueTypes} selectedType={selectedType} setSelectedType={setSelectedType} />
        {filteredPokemons.length === 0 ? (
          <div className="text-center text-gray-500">No Pokémon found.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredPokemons.map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
