import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ClearLocalStorageButton from "../elements/ClearLocalStorageButton";
import MovieCard from "../elements/MovieCard";

const API_KEY = "0e16d9b4af07e316bb36fc1286684dd6";
const BASE_URL = "https://api.themoviedb.org/3";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (!storedFavorites) return [];
    try {
      const parsedFavorites = JSON.parse(storedFavorites);
      return Array.isArray(parsedFavorites)
        ? parsedFavorites.filter((id) => id !== null && id !== undefined) // null 제거
        : [];
    } catch (error) {
      console.error("Failed to parse favorites:", error);
      return [];
    }
  });

  const [movies, setMovies] = useState([]);

  const fetchMovieDetails = async (movieId) => {
    if (!movieId || movieId === "null") {
      console.log("Invalid movie ID:", movieId); // Debugging
      return null;
    }

    try {
      console.log("Fetching details for Movie ID:", movieId);
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: { api_key: API_KEY },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
      return null;
    }
  };

  const addToFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((id) => id !== movieId); // 중복 제거
    updatedFavorites.push(movieId); // 항상 끝에 추가
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const getFavoriteMovies = async () => {
      const validFavorites = favorites.filter((id) => id !== null && id !== undefined);
      const movieDetails = await Promise.all(
        validFavorites.map((movieId) => fetchMovieDetails(movieId))
      );
      setMovies(movieDetails.filter((movie) => movie !== null)); // null 제거
    };

    if (favorites.length > 0) {
      getFavoriteMovies();
    }
  }, [favorites]); // favorites가 변경될 때마다 실행

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="flex items-center">
        <div></div>
      {favorites.length > 0 && (
        <div className="flex my-5">
          <ClearLocalStorageButton />
        </div>
      )}
      </div>

      {movies.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No favorites found.</p>
      ) : (
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <>
              <MovieCard movie={movie} />
              </>
          ))}
        </ul>
      )}

     
    </div>
  );
};

export default FavoritePage;
