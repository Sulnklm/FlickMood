import React, { useState, useEffect } from "react";
import axios from "axios";
import ClearLocalStorageButton from "../elements/ClearLocalStorageButton";
import MovieCard from "../elements/MovieCard";

const API_KEY = "0e16d9b4af07e316bb36fc1286684dd6";
const BASE_URL = "https://api.themoviedb.org/3";

const FavoritePage = () => {
  // Load favorite movie IDs from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
      return Array.isArray(storedFavorites) ? storedFavorites.filter(Boolean) : [];
    } catch (error) {
      console.error("Failed to parse favorites:", error);
      return [];
    }
  });

  const [movies, setMovies] = useState([]);

  // Fetch movie details from API
  const fetchMovieDetails = async (movieId) => {
    if (!movieId) return null;

    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: { api_key: API_KEY },
      });

      const movieData = response.data;

      if (!movieData.genre_ids && movieData.genres) {
        movieData.genre_ids = movieData.genres.map((genre) => genre.id);
      }

      return movieData;
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
      return null;
    }
  };

  useEffect(() => {
    const getFavoriteMovies = async () => {
      const movieDetails = await Promise.all(favorites.map(fetchMovieDetails));
      setMovies(movieDetails.filter(Boolean)); // Remove null values
    };

    if (favorites.length > 0) {
      getFavoriteMovies();
    }
  }, [favorites]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto min-h-screen px-3 lg:px-0">
      {favorites.length > 0 && (
        <div className="flex my-7">
          <ClearLocalStorageButton />
        </div>
      )}

      {movies.length === 0 ? (
        <p className="text-center text-lg text-white/50 mt-10">No favorites found.</p>
      ) : (
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritePage;
