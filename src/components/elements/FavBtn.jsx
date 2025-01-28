import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const FavBtn = ({ movieId }) => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const isLiked = favorites.includes(movieId);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // 부모 Link로 이벤트 전달 차단
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(movieId)
        ? prevFavorites.filter((id) => id !== movieId)
        : [...prevFavorites, movieId];

      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      window.dispatchEvent(new Event("favoritesUpdated"));

      return newFavorites;
    });
  };

  return (
    <div
      className="w-fit flex gap-3 bg-customGrayLight/20 backdrop-blur-2xl border-[0.8px] border-customGray p-2 rounded-full items-center cursor-pointer"
      onClick={toggleFavorite} // 버튼 클릭 이벤트 처리
    >
      <FontAwesomeIcon
        className="text-white text-xl cursor-pointer"
        icon={isLiked ? faHeart : regularHeart}
        size="lg"
        title={isLiked ? "Remove from favorites" : "Add to favorites"}
      />
    </div>
  );
};

export default FavBtn;
