import React from "react";
import Banner from "../swiper/Banner";
import Sidebar from "../home/Sidebar";
import Main from "../home/Main";
import SearchBox from "../global/header/SearchBox";

function Home() {
  return (
    <div className="bg-pattern relative">
      <Banner />
      {/* Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-4">
        {/* Sidebar: Sticky 설정 */}
        <div className="xl:col-span-1 order-2 xl:order-1">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="xl:col-span-3 space-y-5 xl:order-2 xl:mt-5 xl:mr-5">
          <div className="hidden lg:block">
          <SearchBox />
          </div>
          <Main />
        </div>
      </div>
    </div>
  );
}

export default Home;
