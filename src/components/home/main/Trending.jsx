import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import MovieCard from "../../elements/MovieCard";
import fire from "/public/image/fire.svg";

const API_KEY = "0e16d9b4af07e316bb36fc1286684dd6"; // The Movie DB API 키
const BASE_URL = "https://api.themoviedb.org/3"; // The Movie DB API URL

function Trending() {
  const [movies, setMovies] = useState([]); // 영화 목록 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태

  // 트렌디 영화 데이터를 가져오기 위한 API 호출
  const fetchTrendingMovies = async () => {
    setLoading(true); // API 요청 시작 시 로딩 상태 true로 설정
    setError(null); // 오류 상태 초기화

    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results); // 영화 데이터를 상태에 저장
    } catch (err) {
      setError("Failed to load trending movies.");
      console.error(err);
    } finally {
      setLoading(false); // API 요청 후 로딩 종료
    }
  };

  // 컴포넌트 마운트 시 트렌디 영화 데이터 가져오기
  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  if (loading) return <div>Loading...</div>; // 로딩 중 메시지
  if (error) return <div>{error}</div>; // 오류 발생 시 메시지

  return (
    <section>
      <div className="container mx-auto">
        <div className="pl-5 xl:pl-0 flex items-center gap-2 mb-7">
          <h1>Trending</h1>
          <img src={fire} alt="Fire Icon" className="w-8" />
        </div>

        {/* 슬라이더 */}
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"2"}
          spaceBetween={20}
          loop={true}
          breakpoints={{
            1024: {
              slidesPerView: 4.5,
            },
            768: {
              slidesPerView: 2, 
            }
          }}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard movie={movie} /> {/* 영화 카드 컴포넌트 */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Trending;
