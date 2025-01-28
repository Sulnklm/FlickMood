import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import axios from "axios";
import "swiper/css";
import "swiper/css/effect-coverflow";
import MovieCard from "../../elements/MovieCard";
import categories from "/public/data/categories.json";

const API_KEY = "0e16d9b4af07e316bb36fc1286684dd6";
const BASE_URL = "https://api.themoviedb.org/3";

function Mood() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const scrollContainer = useRef(null);

  // 드래그 스크롤 이벤트 핸들러
  const handleMouseDown = (e) => {
    const container = scrollContainer.current;
    container.isMouseDown = true;
    container.startX = e.pageX - container.offsetLeft;
    container.scrollLeftStart = container.scrollLeft;
  };

  const handleMouseMove = (e) => {
    const container = scrollContainer.current;
    if (!container.isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - container.startX) * 1.5; // 드래그 속도
    container.scrollLeft = container.scrollLeftStart - walk;
  };

  const handleMouseUp = () => {
    const container = scrollContainer.current;
    container.isMouseDown = false;
  };

  // 카테고리 버튼 클릭 시 API 호출
  const fetchMovies = async (category) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_genres: category, // Genre Filtering
        },
      });
      setMovies(response.data.results);
    } catch (err) {
      setError("Failed to load movie data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 선택한 카테고리에 따라 영화 목록 업데이트
  useEffect(() => {
    if (selectedCategory) {
      fetchMovies(selectedCategory);
    } else {
      fetchMovies("28");
    }
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="mb-7 pl-5 pt-7 xl:pl-0 xl:pt-0">Pick Your Mood!</h1>
        {/* Category Buttons with Drag Scroll */}
        <div
          ref={scrollContainer}
          className="pl-3 xl:pl-0 flex gap-3 overflow-x-auto scrollbar-hide items-center mb-8"
          style={{
            cursor: "grab",
            userSelect: "none",
            WebkitOverflowScrolling: "touch",
          }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {categories.map((category) => (
            <p
              key={category.id}
              className={`cursor-pointer font-[400] text-center whitespace-nowrap py-2 px-4 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-customGreenLight brightness-125 text-customMint"
                  : "bg-customGreenLight text-white/40"
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </p>
          ))}
        </div>

        {/* Movie Swiper */}
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
    </div>
  );
}

export default Mood;
