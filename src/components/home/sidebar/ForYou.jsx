import React, { useEffect, useState } from "react";
import MovieCardSmall from "../../elements/MovieCardSmall";

const API_KEY = "0e16d9b4af07e316bb36fc1286684dd6"; // TMDB API 키

function ForYou() {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (!storedFavorites) return [];
    try {
      const parsedFavorites = JSON.parse(storedFavorites);
      return Array.isArray(parsedFavorites) ? parsedFavorites : [];
    } catch (error) {
      console.error("Failed to parse favorites:", error);
      return [];
    }
  });

  const [recommendedMovies, setRecommendedMovies] = useState([]);

  const fetchRecommendations = async () => {
    if (!favorites.length) {
      console.log("No favorites found."); // 디버깅
      return;
    }

    const latestMovieId = favorites[favorites.length - 1]; // 가장 최근 Favorite
    if (!latestMovieId) {
      console.log("Invalid movie ID:", latestMovieId); // 디버깅
      return;
    }

    try {
      console.log("Fetching recommendations for Movie ID:", latestMovieId);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${latestMovieId}/similar?api_key=${API_KEY}`
      );
      const data = await response.json();

      if (data && data.results) {
        // Filter movies without genres
        const filteredMovies = data.results.filter(
          (movie) => movie.genre_ids && movie.genre_ids.length > 0
        );

        // If not enough movies, fetch additional popular movies
        if (filteredMovies.length < 3) {
          console.log("Not enough recommended movies. Fetching popular movies.");
          const popularResponse = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
          );
          const popularData = await popularResponse.json();

          // Combine recommended and popular movies
          const additionalMovies = popularData.results.filter(
            (movie) => movie.genre_ids && movie.genre_ids.length > 0
          );

          // Merge and slice to ensure we only get 3 movies
          const combinedMovies = [...filteredMovies, ...additionalMovies].slice(
            0,
            3
          );
          setRecommendedMovies(combinedMovies);
        } else {
          // Use only recommended movies if there are enough
          setRecommendedMovies(filteredMovies.slice(0, 3));
        }
      } else {
        console.log("No recommendations found.");
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [favorites]);

  return (
    <section className="bg-customGreen rounded-[20px] m-5 p-8">
      <h2 className="text-white mb-7">You Might Like</h2>
      {recommendedMovies.length === 0 ? (
        <p className="text-white/60">
          No recommendations available. Add some movies to your favorites!
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {recommendedMovies.map((movie) => (
            <MovieCardSmall key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ForYou;
