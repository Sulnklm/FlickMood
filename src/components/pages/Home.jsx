import React from "react";
import Banner from "../home/main/Banner";
import Sidebar from "../home/Sidebar";
import Main from "../home/Main";
import SearchBox from "../global/header/SearchBox";

function Home() {
  return (
    <div className="bg-pattern relative">
      <Banner />
      <div className="grid grid-cols-1 xl:grid-cols-4">
        <div className="xl:col-span-1 order-2 xl:order-1">
          <Sidebar />
        </div>
        <div className="xl:col-span-3 space-y-5 xl:order-2 lg:mt-5 xl:mr-5 xl:mx-0">
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
