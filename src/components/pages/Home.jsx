import React from "react";
import TopMovies from "../others/TopMovies";
import Banner from "../swiper/Banner";
import Ranking from "../swiper/RankingSlide";

function Home() {

  return (
    <div>
        <Banner />
        <Ranking />
        <TopMovies />
    </div>
  );
}

export default Home
