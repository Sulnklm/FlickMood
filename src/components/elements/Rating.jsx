import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RatingBox = ({ rating }) => {
  return (
    <div className="h-fit flex items-center bg-customGrayLight/20 backdrop-blur-md justify-center gap-1 border-[0.8px] border-customGray rounded-full px-2.5 py-0.5 w-fit">
      {/* 평점 숫자 */}
      <p className="text-base font-[400]">{rating}</p>
      {/* 별 아이콘 */}
      <FontAwesomeIcon icon={faStar} className="max-w-4 w-full h-auto text-customYellow" />
    </div>
  );
};

export default RatingBox;
