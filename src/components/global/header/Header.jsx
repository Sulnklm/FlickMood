// Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import FavoriteCountButton from "./FavoriteCountButton";

function Header() {
  return (
    <header className="sticky bg-customGreen top-0 shadow-md z-10 px-5">
      <div className="container mx-auto flex items-center gap-5 py-3">
        <Link to="/" className="flex justify-start">
          <h2 className="font-[400]">FlickMood</h2>
        </Link>
        <div className="flex-grow flex justify-end">
          <nav>
            <ul className="flex justify-end gap-5">
              <SearchBox />
              <FavoriteCountButton />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
