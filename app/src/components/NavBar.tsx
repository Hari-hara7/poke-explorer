// src/components/NavBar.tsx
import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-2xl font-bold">Pokémon Explorer</Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-4">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/favorites" className="hover:text-yellow-300">Favorites</Link>
          <Link to="/compare" className="hover:text-yellow-300">Compare</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
        <Link to="/" className="block text-center py-2 px-4 hover:bg-blue-700">Home</Link>
        <Link to="/favorites" className="block text-center py-2 px-4 hover:bg-blue-700">Favorites</Link>
        <Link to="/compare" className="block text-center py-2 px-4 hover:bg-blue-700">Compare</Link>
      </div>
    </nav>
  );
};

export default NavBar;
