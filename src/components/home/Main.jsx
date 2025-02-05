import React from "react";
import Mood from "./main/Mood";
import New from "./main/New";
import Trending from "./main/Trending";

function Main() {
  return (
    <div className="bg-customGreen rounded-t-[20px] xl:rounded-[20px] md:p-5 xl:p-10 space-y-10 lg:space-y-12">
      <Mood />
      <Trending />
      <New />
    </div>
  );
}

export default Main;
