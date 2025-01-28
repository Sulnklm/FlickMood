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
      // console.log("Invalid movie ID:", movieId); 
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
      setMovies(movieDetails.filter((movie) => movie !== null)); 
    };

    if (favorites.length > 0) {
      getFavoriteMovies();
    }
  }, [favorites]); 

  return (
    <div className="container mx-auto min-h-screen px-3 lg:px-0">
      <div className="flex">
        <div></div>
      {favorites.length > 0 && (
        <div className="flex my-7">
          <ClearLocalStorageButton />
        </div>
      )}
      </div>

      {movies.length === 0 ? (
        <p className="text-center text-lg text-gray-5">No favorites found.</p>
      ) : (
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
