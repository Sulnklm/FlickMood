import React from "react";
import { Link } from "react-router-dom";
import { handleMovieClick } from "../utils/storage"; // 공통 함수 가져오기

const MovieCardSmall = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w780${movie.poster_path}`;

  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  return (
    <div>
      <Link
        to={`/movie/${movie.id}`}
        className="block w-full h-full"
        onClick={() => handleMovieClick(movie.id)} // 공통 함수 호출
      >
        {/* Background Image */}
        <div className="flex gap-3 items-center">
          <img
            className="object-cover aspect-square max-w-[5rem] rounded-[10px]"
            src={posterUrl}
            alt={movie.title}
            loading="lazy" 
          />

          {/* Movie Title */}
          <div>
            <h3 className="text-white text-base">{movie.title}</h3>
            <p className="text-white/60 text-sm">
              {movie.genre_ids
                ?.slice(0, 2)
                .map((id) => genreMap[id])
                .filter(Boolean)
                .join(" ∙ ") || ""}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCardSmall;
