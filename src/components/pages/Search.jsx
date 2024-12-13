import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios to make API requests
import { useLocation, Link } from "react-router-dom"; 

const Search = () => {
  const [searchResults, setSearchResults] = useState([]); // State to hold search results
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const location = useLocation(); // Use the useLocation hook to access query from the URL // URL의 현재 위치를 추적하는 useLocation hook
  const searchQuery = new URLSearchParams(location.search).get("query"); // Get query parameter from the URL // URL 쿼리에서 "query" 값 추출

  // Fetch search results based on the query
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) return; // If there's no search query, do nothing

      setLoading(true); // Start loading

      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: "0e16d9b4af07e316bb36fc1286684dd6", // My API key
            query: searchQuery, // The search query from the input
            page: 1, 
          },
        });

        setSearchResults(response.data.results); // Update state with search results
      } catch (error) {
        setError("Error fetching search results");
        console.error(error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchSearchResults();
  }, [searchQuery]); // Fetch results whenever the search query changes

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">Search Results for "{searchQuery}"</h2>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {searchResults.length === 0 ? (
        <p>No results found for "{searchQuery}"</p>
      ) : (
        <ul className="space-y-4">
          {searchResults.map((movie) => (
            <li key={movie.id} className="flex items-center gap-3">
                          <Link to={`/movie/${movie.id}`} className="text-blue-600 hover:underline">

              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
                className="w-24 h-auto object-cover"
              />
                <p>{movie.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
