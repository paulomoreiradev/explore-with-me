import { useState, useEffect } from "react";

export interface FavoriteExperience {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: string;
  guideName: string;
}

const FAVORITES_KEY = "vai-por-mim-favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteExperience[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const addFavorite = (experience: FavoriteExperience) => {
    const exists = favorites.some((f) => f.id === experience.id);
    if (exists) return;
    
    const updated = [experience, ...favorites];
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const isFavorite = (id: string) => {
    return favorites.some((f) => f.id === id);
  };

  const toggleFavorite = (experience: FavoriteExperience) => {
    if (isFavorite(experience.id)) {
      removeFavorite(experience.id);
      return false;
    } else {
      addFavorite(experience);
      return true;
    }
  };

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
};
