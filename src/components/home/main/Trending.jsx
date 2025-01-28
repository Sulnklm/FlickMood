import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import MovieCard from "../../elements/MovieCard";
import fire from "/public/image/fire.svg";

const API_KEY = "0e16d9b4af07e316bb36fc1286684dd6";
const BASE_URL = "https://api.themoviedb.org/3";

function Trending() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrendingMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      setError("Failed to load trending movies.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section>
      <div className="container mx-auto">
        <div className="pl-5 xl:pl-0 flex items-center gap-2 mb-7">
          <h1>Trending</h1>
          <img src={fire} alt="Fire Icon" className="w-8" />
        </div>

        <Swiper
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"2.5"}
          spaceBetween={20}
          speed={2000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[EffectCoverflow, Autoplay]}
          breakpoints={{
            1024: {
              slidesPerView: 4.5,
            },
            768: {
              slidesPerView: 3.5,
            },
          }}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Trending;
