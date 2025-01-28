import React, { useEffect, useState } from "react";
import MovieCardSmall from "../../elements/MovieCardSmall";

const API_KEY = "0e16d9b4af07e316bb36fc1286684dd6"; // TMDB API 키

function RecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const storedRecentlyViewed = localStorage.getItem("recentlyViewed");
    if (!storedRecentlyViewed) return [];
    try {
      const parsedRecentlyViewed = JSON.parse(storedRecentlyViewed);
      return Array.isArray(parsedRecentlyViewed) ? parsedRecentlyViewed : [];
    } catch (error) {
      console.error("Failed to parse recently viewed movies:", error);
      return [];
    }
  });

  const [movies, setMovies] = useState([]);
  const [isVisible, setIsVisible] = useState(true); // 토글 상태 관리

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
      );
      const data = await response.json();

      // `genres`를 `genre_ids`로 변환
      if (data.genres) {
        data.genre_ids = data.genres.map((genre) => genre.id);
      }

      return data;
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
      return null;
    }
  };

  useEffect(() => {
    const getRecentlyViewedMovies = async () => {
      if (!recentlyViewed.length) return;

      const movieDetails = await Promise.all(
        recentlyViewed.slice(0, 3).map((movieId) => fetchMovieDetails(movieId))
      );
      setMovies(movieDetails.filter((movie) => movie !== null)); // Null 제거
    };

    getRecentlyViewedMovies();
  }, [recentlyViewed]);

  return (
    <section className="bg-customGreen rounded-[20px] m-5 p-8">
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-white">Recently Viewed</h2>
        {/* 토글 버튼 */}
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="text-white/50 bg-gray-700 px-3 py-1 rounded-full text-sm"
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>
      {isVisible && (
        <>
          {movies.length === 0 ? (
            <p className="text-white/60">No recently viewed movies available.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {movies.map((movie) => (
                <MovieCardSmall key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default RecentlyViewed;
