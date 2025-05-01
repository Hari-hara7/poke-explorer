import React from 'react';

const SortOptions = ({ sortOption, setSortOption }: { sortOption: string; setSortOption: (s: string) => void }) => (
  <select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    className="mb-4 p-2 border rounded"
  >
    <option value="id-asc">ID ↑</option>
    <option value="id-desc">ID ↓</option>
    <option value="name-asc">Name A-Z</option>
    <option value="name-desc">Name Z-A</option>
  </select>
);

export default SortOptions;
