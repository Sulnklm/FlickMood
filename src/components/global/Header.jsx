import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Header() {
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
    <header className="sticky top-0 bg-white shadow-md z-10 bg-opacity-90"> {/* Sticky header with background and shadow */}
      <div className="container mx-auto flex items-center p-4">
        <Link to="/" className="flex justify-start">
          <img src="../public/logo.png" alt="" className="w-[7rem]" />
        </Link>
        <div className="flex-grow flex justify-end">
          <nav>
            <ul className="flex justify-end gap-10">
              <li>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-xl"
                />
              </li>
              <li className="flex items-center justify-center gap-1">
                <Link to="/favorite">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-xl"
                  />
                </Link>
                {favoriteCount > 0 && (
                  <span className=" bg-purple-500 text-white text-xs rounded-full px-1">
                    {favoriteCount}
                  </span>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
