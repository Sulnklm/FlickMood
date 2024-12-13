import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // 삭제 아이콘

const ClearLocalStorageButton = () => {
  const clearStorageAndReload = () => {
    localStorage.clear(); // 로컬 스토리지 비우기
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <button onClick={clearStorageAndReload} className="flex gap-3 items-center bg-purple-500 rounded-full px-3 py-1">
      <FontAwesomeIcon icon={faTrash} className="text-white"/>
      <h3 className="text-white">Clear</h3>
    </button>
  );
};

export default ClearLocalStorageButton;
