import React from "react";
import { Link } from "react-router-dom";
import RatingBox from "./Rating";
import { handleMovieClick } from "../utils/storage"; // 공통 함수 가져오기
import "../../index.css";

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

function MovieCard({ movie }) {
  const posterUrl = `https://image.tmdb.org/t/p/w780${movie.poster_path}`;

  return (
    <div className="relative border-1 aspect-[2.7/3.8] max-w-[30rem] w-full h-auto rounded-[20px] border-[1px] border-[#1E2B31] overflow-hidden">
      <Link
        to={`/movie/${movie.id}`}
        className="block w-full h-full"
        onClick={() => handleMovieClick(movie.id)} // 공통 함수 호출
      >
        {/* Background Image */}
        <img
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(to bottom, #041219 0%, rgba(30, 43, 49, 0.7) 7%, rgba(0, 0, 0, 0) 22%, rgba(0, 0, 0, 0) 60%, rgba(30, 43, 49, 0.8) 77%, #041219 88%)`,
          }}
        ></div>

        {/* Content (Text, Buttons) */}
        <div className="absolute inset-0 z-20 p-3.5 flex flex-col justify-between">
          {/* Movie Ranking */}
          <div>{""}</div>

          {/* Movie Title and Genres */}
          <div>
            <h3 className="text-white font-[450] text-ellipsis overflow-hidden whitespace-nowrap max-w-[100%]">
              {movie.title}
            </h3>
            <p className="text-white/60 text-ellipsis overflow-hidden whitespace-nowrap max-w-[100%]">
              {movie.genre_ids
                ?.slice(0, 2)
                .map((id) => genreMap[id])
                .filter(Boolean)
                .join(" ∙ ") || ""}
            </p>
          </div>
        </div>
      </Link>

      <div className="absolute top-0 right-0 m-2.5 z-30">
        <RatingBox rating={movie.vote_average.toFixed(1)} />
      </div>
    </div>
  );
}

export default MovieCard;
