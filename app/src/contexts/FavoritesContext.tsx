import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (pokemonId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemonId: number) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(pokemonId)) {
        return prevFavorites.filter((id) => id !== pokemonId);
      }
      return [...prevFavorites, pokemonId];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
