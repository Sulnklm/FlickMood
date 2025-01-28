import React from "react";
import ForYou from "./sidebar/ForYou";
import RecentlyViewed from "./sidebar/RecentlyViewed";
import Trailers from "./sidebar/Trailers";

function Sidebar() {
  return (
    <div className="mx-5 mt-5 xl:space-y-5">
      <Trailers />
      <div className="grid mt-5 xl:mt-0 md:flex gap-5 flex-grow xl:grid xl:space-y-5">
        <ForYou />
        <RecentlyViewed />
      </div>
    </div>
  );
}

export default Sidebar;
