import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const debounceTimer = setTimeout(() => {
      fetchSearchResults();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      // 키보드 강제 닫기
      if (window && window.document) {
        const inputElement = document.activeElement;
        if (inputElement && inputElement.blur) {
          inputElement.blur();
        }
      }
    }
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      setSearchResults([]);
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname !== "/search") {
      setSearchQuery("");
    }
  }, [location]);

  return (
    <div className="relative w-full">
      <div className="relative flex items-center w-full">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-4 text-xl text-white/50"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInput}
          onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
          placeholder="Search movies..."
          className="p-2.5 md:p-4 pl-12 pr-5 w-full rounded-full bg-white/10 text-white focus:outline-none focus:bg-white/10"
        />
      </div>

      {isLoading && <div className="mt-2 text-white/50">Loading...</div>}

      {searchQuery && searchResults.length > 0 && (
        <div className="absolute top-12 mt-1 bg-white/10 text-white max-h-50 overflow-y-auto w-full border border-gray-700 rounded-lg">
          {searchResults.map((movie) => (
            <div
              key={movie.id}
              className="p-2 cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              {movie.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
