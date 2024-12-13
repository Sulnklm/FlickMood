import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // To fetch movie details from the API
import ClearLocalStorageButton from "../elements/ClearLocalStorageButton";

const API_KEY = "0e16d9b4af07e316bb36fc1286684dd6"; // Your Movie DB API key
const BASE_URL = "https://api.themoviedb.org/3"; // Movie DB base URL

const FavoritePage = () => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const [movies, setMovies] = useState([]); // To store movie details

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: { api_key: API_KEY },
      });
      return response.data;
    } catch (error) { 
      console.error("Failed to fetch movie details:", error);
    }
  };

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const getFavoriteMovies = async () => {
      // await은 async 언애서만 실행될 수 있다
      const movieDetails = await Promise.all(
        // await은 Promise를 반환하는 async가 완료된 후에 실행됨
        favorites.map(async (movieId) => {
          const details = await fetchMovieDetails(movieId);
          return details;
        })
      );
      setMovies(movieDetails); // Update movies state with detailed information
    };

    if (favorites.length > 0) {
      getFavoriteMovies();
    }
  }, [favorites]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Favorite Movies</h1>
      
      {/* Show message when no favorites are found */}
      {movies.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No favorites found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <li key={movie.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">{movie.title}</h3>
                  <p className="text-sm text-gray-500">{movie.release_date}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* ClearLocalStorageButton */}
      {favorites.length > 0 && (
        <div className="text-center mt-8">
          <ClearLocalStorageButton />
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
