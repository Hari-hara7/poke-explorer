import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { PokemonProvider } from './contexts/PokemonContext';
import HomePage from './pages/HomePage';
import PokemonDetailPage from './pages/PokemonDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import ComparePage from './pages/ComparePage';
import NavBar from './components/NavBar';


const App = () => {
  return (
    <PokemonProvider>
      <FavoritesProvider>
        <Router>
        <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </PokemonProvider>
  );
};

export default App;
