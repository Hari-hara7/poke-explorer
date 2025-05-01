import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="p-4 bg-white-600 text-black text-center text-2xl font-bold">
    <Link to="/">Pokédex</Link>
  </header>
);

export default Header;
