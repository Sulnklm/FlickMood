import React from "react";
import ForYou from "./sidebar/ForYou";
import RecentlyViewed from "./sidebar/RecentlyViewed";
import Trailers from "./sidebar/Trailers";

function Sidebar() {
  return (
    <div className="mx-3 xl:mx-5 mt-3 xl:mt-5 space-y-3 xl:space-y-5">
      <Trailers />
      <div className="grid mt-5 xl:mt-0 md:flex gap-3 xl:gap-5 flex-grow xl:grid">
        <ForYou />
        <RecentlyViewed />
      </div>
    </div>
  );
}

export default Sidebar;
