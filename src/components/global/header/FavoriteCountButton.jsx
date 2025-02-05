// FavoriteButton.jsx
import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const FavoriteCountButton = () => {
  const [favoriteCount, setFavoriteCount] = useState(0); // State for favorite count

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const updateFavoriteCount = () => {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavoriteCount(savedFavorites.length); // Update favorite count
    };

    updateFavoriteCount(); // Initial count load

    // Event listener for favorites updated
    const handleFavoritesUpdated = () => {
      updateFavoriteCount();
    };

    window.addEventListener("favoritesUpdated", handleFavoritesUpdated);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdated);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <li className="flex items-center justify-center gap-1.5">
      <Link to="/favorite">
        <FontAwesomeIcon icon={faHeart} className="text-xl text-white" />
      </Link>
      {favoriteCount > 0 && (
        <span className="bg-customMint font-[600] text-xs rounded-full px-[5px]">
          {favoriteCount}
        </span>
      )}
    </li>
  );
};

export default FavoriteCountButton;
