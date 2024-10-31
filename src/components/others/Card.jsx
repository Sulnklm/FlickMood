import React from "react";
import FavoriteIcon from "../others/FavBtn"; // FavoriteIcon을 기본으로 가져옴

function Card({ movie }) {
  return (
    <div>
      <div className="relative border-1 aspect-[2.7/4] lg:w-[15rem] md:w-[13rem] sm:w-[10rem] w-[7rem] rounded-lg overflow-hidden drop-shadow-lg">
        <img
          className="h-full lg:w-[15rem] md:w-[13rem] sm:w-[10rem] w-[7rem] object-cover"
          src={movie.imgUrl}
          alt={movie.title} // Add alt text for accessibility
        />
        <h1 className="absolute bottom-0 left-3 lg:text-5xl text-white drop-shadow-lg">
          {movie.ranking}
        </h1>
        <FavoriteIcon movieId={movie.id} /> {/* 영화 ID를 prop으로 전달 */}
      </div>
    </div>
  );
}

export default Card;
