import React from "react";
import FavoriteIcon from "../others/FavBtn";

function Card({ movie }) {
  return (
    <div>
      <div className="relative border-1 aspect-[2.7/4] 2xl:w-[23rem] lg:w-[18rem] md:w-[13rem] sm:w-[10rem] w-[7rem] rounded-lg overflow-hidden drop-shadow-lg">
        <img
          className="h-full 2xl:w-[23rem] lg:w-[18rem] md:w-[13rem] sm:w-[10rem] w-[7rem] object-cover"
          src={movie.imgUrl}
          alt={movie.title} 
        />
        <h1 className="absolute bottom-0 left-3 lg:text-5xl text-white drop-shadow-lg">
          {movie.ranking}
        </h1>
        <FavoriteIcon movieId={movie.id} /> 
      </div>
    </div>
  );
}

export default Card;
