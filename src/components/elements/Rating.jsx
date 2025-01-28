import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RatingBox = ({ rating }) => {
  return (
    <div className="h-fit flex items-center bg-customGrayLight/20 backdrop-blur-sm justify-center gap-1 border-[0.8px] border-customGray rounded-full px-2.5 py-1 w-fit">
      {/* 평점 숫자 */}
      <p className="text-sm">{rating}</p>
      {/* 별 아이콘 */}
      <FontAwesomeIcon icon={faStar} className="text-customYellow" />
    </div>
  );
};

export default RatingBox;
