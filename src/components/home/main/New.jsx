import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import axios from "axios";
import MovieCard from "../../elements/MovieCard";
import newBadge from "/public/image/new.svg";

const API_KEY = "0e16d9b4af07e316bb36fc1286684dd6"; 
const BASE_URL = "https://api.themoviedb.org/3";

function New() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 트렌디 영화 데이터 가져오기
  const fetchTrendyMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: 1,
        },
      });
      return response.data.results.map((movie) => movie.id); 
    } catch (err) {
      console.error("Failed to fetch trendy movies:", err);
      return [];
    }
  };

  const fetchNewMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const trendyIds = await fetchTrendyMovies(); 

      const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: 1,
        },
      });

      const uniqueMovies = response.data.results.filter(
        (movie) => !trendyIds.includes(movie.id)
      );

      setMovies(uniqueMovies);
    } catch (err) {
      setError("Failed to load new movies.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="container mx-auto pb-10 lg:pb-0">
        <div className="pl-5 xl:pl-0 flex items-center gap-2 mb-7">
          <h1>New Release</h1>
          <img src={newBadge} alt="New Icon" className="w-10 pt-1" />
        </div>

        <Swiper
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"2"}
          spaceBetween={20}
          speed={2000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[EffectCoverflow, Autoplay]}
          breakpoints={{
            1024: { slidesPerView: 4.5 },
            768: { slidesPerView: 3.5 },
          }}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default New;
