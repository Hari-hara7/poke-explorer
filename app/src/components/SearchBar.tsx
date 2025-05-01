import React from 'react';

const SearchBar = ({ search, setSearch }: { search: string; setSearch: (s: string) => void }) => (
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search Pokémon..."
    className="w-full p-2 mb-4 border rounded"
  />
);

export default SearchBar;
