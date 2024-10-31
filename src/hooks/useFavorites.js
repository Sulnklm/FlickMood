import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Toggle favorite status
  const toggleFavorite = (movieId) => {
    const updatedFavorites = favorites.includes(movieId)
      ? favorites.filter((fav) => fav !== movieId) // Remove if already a favorite
      : [...favorites, movieId]; // Add to favorites

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save to localStorage
    window.dispatchEvent(new Event("favoritesUpdated")); // Dispatch event to notify changes
  };

  return { favorites, toggleFavorite };
};

export default useFavorites;
