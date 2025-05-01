import React from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon }: { pokemon: any }) => (
  <Link to={`/pokemon/${pokemon.id}`} className="border p-2 rounded text-center shadow">
    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    <h2 className="font-bold capitalize">{pokemon.name}</h2>
    <p>ID: {pokemon.id}</p>
  </Link>
);

export default PokemonCard;
