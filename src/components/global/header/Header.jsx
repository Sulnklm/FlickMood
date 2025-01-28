// Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import FavoriteCountButton from "./FavoriteCountButton";

function Header() {
  return (
    <header className="sticky bg-customGreen top-0 shadow-md px-3.5 z-[1000]">
      <div className="container mx-auto flex items-center gap-3 py-3">
        <Link to="/" className="flex justify-start">
          <h2 className="font-[500] text-xl text-customMint">FlickMood</h2>
        </Link>
        <div className="flex-grow flex justify-end">
          <nav>
            <ul className="flex justify-end gap-3">
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
