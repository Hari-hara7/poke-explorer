import React, { useState, useMemo } from 'react';
import { usePokemons } from '../hooks/usePokemons';
import { usePagination } from '../hooks/usePagination';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import SortOptions from '../components/SortOptions';
import Pagination from '../components/Pagination';
import PokemonCard from '../components/PokemonCard';
import CompareTool from '../components/CompareTool';
import ErrorBoundary from '../components/ErrorBoundary';

const HomePage = () => {
  const { pokemons, loading, error } = usePokemons();
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('id-asc');
  const itemsPerPage = 20;

  const filteredPokemons = useMemo(() => {
    let filtered = pokemons;

    if (search) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((pokemon) =>
        selectedTypes.every((type) =>
          pokemon.types.map((t: any) => t.type.name).includes(type)
        )
      );
    }

    switch (sortOption) {
      case 'id-asc':
        filtered.sort((a, b) => a.id - b.id);
        break;
      case 'id-desc':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [pokemons, search, selectedTypes, sortOption]);

  const { currentPage, totalPages, nextPage, prevPage, goToPage } = usePagination(
    filteredPokemons.length,
    itemsPerPage
  );

  const currentPokemons = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPokemons.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPokemons, currentPage, itemsPerPage]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Something went wrong!</div>;

  const uniqueTypes = Array.from(
    new Set(pokemons.flatMap((p) => p.types.map((t: any) => t.type.name)))
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-4 max-w-5xl mx-auto">
        <SearchBar search={search} setSearch={setSearch} />
        <TypeFilter types={uniqueTypes} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
        <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
        <CompareTool />
        {currentPokemons.length === 0 ? (
          <div className="text-center text-gray-500">No Pokémon found.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {currentPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
          goToPage={goToPage}
        />
      </main>
    </div>
  );
};

export default HomePage;
