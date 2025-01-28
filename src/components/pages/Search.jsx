import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useLocation } from "react-router-dom";
import MovieCard from "../elements/MovieCard";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const location = useLocation(); // Use the useLocation hook to access query from the URL 
  const searchQuery = new URLSearchParams(location.search).get("query"); 

  // Fetch search results based on the query
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) return; 

      setLoading(true);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: "0e16d9b4af07e316bb36fc1286684dd6", 
              query: searchQuery, 
              page: 1,
            },
          }
        );

        // Filter out movies without a poster image
        const filteredResults = response.data.results.filter(
          (movie) => movie.poster_path
        );

        setSearchResults(filteredResults); // Update state with filtered results
      } catch (error) {
        setError("Error fetching search results");
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchSearchResults();
  }, [searchQuery]); // Fetch results whenever the search query changes

  return (
    <div className="min-h-screen container mx-auto pt-10 px-3">
      <h2 className="mb-8 text-center text-white/60">
        Search Results for "{searchQuery}"
      </h2>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {searchResults.length === 0 ? (
        <p className="text-center">No results found for "{searchQuery}"</p>
      ) : (
        <ul className="gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 place-items-center">
          {searchResults.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
