// Header.jsx
import React from "react"; 
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate to handle navigation
import SearchBox from "./SearchBox"; // Import the SearchBox component
import FavoriteCountButton from "./FavoriteCountButton"; // Import the FavoriteButton component
import axios from "axios";

function Header() {
  const navigate = useNavigate(); // Use useNavigate to handle navigation

  return (
    <header className="sticky top-0 bg-white shadow-md z-10 bg-opacity-90">
      <div className="container mx-auto flex items-center p-4">
        <Link to="/" className="flex justify-start">
          <img src="../public/logo.png" alt="Logo" className="w-[7rem]" />
        </Link>
        <div className="flex-grow flex justify-end">
          <nav>
            <ul className="flex justify-end gap-5 lg:gap-10">
              {/* Search Box with Suggestions */}
              <li className="flex items-center gap-2">
                <SearchBox onResultClick={(movieId) => navigate(`/movie/${movieId}`)} /> {/* Use the SearchBox component and pass the click handler */}
              </li>

              {/* Favorite Button with Count */}
              <FavoriteCountButton /> {/* Use the FavoriteButton component here */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
