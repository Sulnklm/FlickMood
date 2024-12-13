import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const FavoriteButton = ({ movieId }) => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const isLiked = favorites.includes(movieId);

  const toggleFavorite = () => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(movieId)
        ? prevFavorites.filter((id) => id !== movieId)
        : [...prevFavorites, movieId];

      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      window.dispatchEvent(new Event("favoritesUpdated"));

      return newFavorites;
    });
  };

  return (
    <div
      className="w-fit flex gap-3 bg-purple-500 py-2 px-5 rounded-full items-center cursor-pointer"
      onClick={toggleFavorite}
    >
      <FontAwesomeIcon
        className="text-white text-2xl cursor-pointer"
        icon={isLiked ? faHeart : regularHeart}
        size="lg"
        title={isLiked ? "Remove from favorites" : "Add to favorites"}
      />
      <h3 className="text-white">Add to Favorite</h3>
    </div>
  );
};

export default FavoriteButton;
