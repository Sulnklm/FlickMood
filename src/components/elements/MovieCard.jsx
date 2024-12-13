import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {

  const posterUrl = `https://image.tmdb.org/t/p/w780${movie.poster_path}`;

  return (
    <div>
      <div className="relative border-1 aspect-[2.7/4] max-w-[30rem] w-full h-auto  rounded-lg overflow-hidden drop-shadow-lg">
      <Link to={`/movie/${movie.id}`}>

        <img
          className="object-cover"
          src={posterUrl}
          alt={movie.title} 
        />
        <h1 className="absolute bottom-0 left-3 lg:text-5xl text-white drop-shadow-lg">
          {movie.ranking}
        </h1>
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
