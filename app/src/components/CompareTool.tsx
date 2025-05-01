import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../types/pokemon';

interface CompareToolProps {
  pokemon1: Pokemon | null;
  pokemon2: Pokemon | null;
}

const CompareTool: React.FC<CompareToolProps> = ({ pokemon1, pokemon2 }) => {
  if (!pokemon1 || !pokemon2) {
    return <div className="text-center text-lg">Select two Pokémon to compare!</div>;
  }

  const renderStats = (pokemon: Pokemon) => (
    <div className="flex flex-col">
      <h2 className="font-bold text-xl">{pokemon.name}</h2>
      <div className="flex justify-between">
        <p>HP: {pokemon.stats.find((stat) => stat.stat.name === 'hp')?.base_stat}</p>
        <p>Attack: {pokemon.stats.find((stat) => stat.stat.name === 'attack')?.base_stat}</p>
        <p>Defense: {pokemon.stats.find((stat) => stat.stat.name === 'defense')?.base_stat}</p>
        <p>Speed: {pokemon.stats.find((stat) => stat.stat.name === 'speed')?.base_stat}</p>
      </div>
    </div>
  );

  return (
    <div className="flex justify-between p-4 border-t-2">
      <div className="w-1/2">{renderStats(pokemon1)}</div>
      <div className="w-1/2">{renderStats(pokemon2)}</div>
    </div>
  );
};

export default CompareTool;
