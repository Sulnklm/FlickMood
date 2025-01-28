import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ClearLocalStorageButton = () => {
  const clearStorageAndReload = () => {
    const userConfirmed = window.confirm(
      "This will permanently clear your movie list. Do you want to proceed?"
    );

    if (userConfirmed) {
      localStorage.clear(); // reset local storage
      window.location.reload(); // refresh the page
    }
  };

  return (
    <button
      onClick={clearStorageAndReload}
      className="bg-customGreenLight brightness-110 border-[0.8px] border-customGreenLight flex gap-3 items-center rounded-full px-3 py-1"
    >
      <FontAwesomeIcon icon={faTrash} className="text-white/70" />
      <h3 className="text-white/70">Clear</h3>
    </button>
  );
};

export default ClearLocalStorageButton;
