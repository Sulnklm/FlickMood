import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css"; // Swiper 기본 스타일
import "swiper/css/effect-coverflow"; // Coverflow 효과를 위한 스타일
import MovieCard from "../elements/MovieCard"; // MovieCard 컴포넌트
import FavoriteButton from "../elements/FavBtn";

const API_KEY = "0e16d9b4af07e316bb36fc1286684dd6"; // The Movie DB API 키
const BASE_URL = "https://api.themoviedb.org/3"; // The Movie DB API URL

const MovieDetail = () => {
  const { movieId } = useParams(); // URL에서 영화 ID 가져오기
  const [movieDetails, setMovieDetails] = useState(null); // 영화 상세 정보
  const [relatedMovies, setRelatedMovies] = useState([]); // 관련 영화 (같은 장르)
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태

  // 영화 상세 정보와 관련 영화 불러오기
  const fetchMovieDetails = async () => {
    setLoading(true);
    setError(null); // 오류 초기화

    try {
      // 영화 상세 정보 가져오기
      const movieResponse = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
        },
      });

      setMovieDetails(movieResponse.data); // 영화 상세 정보 상태 업데이트
      console.log("Movie Details:", movieResponse.data); // Log movie details to check

      // 같은 장르의 관련 영화 가져오기
      const genreIds = movieResponse.data.genres.map((genre) => genre.id); // 영화의 장르 ID들
      console.log("Genre IDs:", genreIds); // Log genre IDs to check

      // If genres are found, fetch related movies
      if (genreIds.length > 0) {
        const relatedResponse = await axios.get(`${BASE_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            with_genres: genreIds.join(","), // Join genre IDs with commas
          },
        });

        setRelatedMovies(relatedResponse.data.results); // Update related movies state
        console.log("Related Movies:", relatedResponse.data.results); // Log related movies to check
      } else {
        setRelatedMovies([]); // If no genres, set related movies to empty array
      }
    } catch (err) {
      setError("Failed to load movie data.");
      console.error(err); // Log error if API request fails
    } finally {
      setLoading(false); // Set loading to false after data fetching is complete
    }
  };

  // Fetch movie data when component mounts or movieId changes
  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]); // Dependency array ensures fetchMovieDetails is called when movieId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="container mx-auto py-10 p-5">
        {movieDetails && (
          <div className="lg:flex items-center space-y-5 gap-10">
            {/* Display movie poster */}
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="max-w-[30rem] w-full h-auto rounded-md shadow-lg"
            />
            <div className="space-y-5">
              {/* Display movie title */}
              <h1 className="font-bold mb-4">{movieDetails.title}</h1>

              {/* Display movie release date and rating */}
              <p className="text-lg">
                {movieDetails.release_date}
              </p>
              <p className="text-lg">
                Rating: {movieDetails.vote_average} / 10
              </p>

              {/* Display movie genres */}
              <div className="">
                <h3>Genres: </h3> {movieDetails.genres.map((genre) => genre.name).join(", ")}{" "}
                {/* Join all genres with commas */}
              </div>

              {/* Display movie overview */}
              <p>{movieDetails.overview}</p>

              <FavoriteButton movieId={movieId} />
            </div>
          </div>
        )}
      </div>

      <div className="grid bg-slate-100 py-10">
        {/* Display related movies */}
        <h2 className="text-3xl font-bold text-center my-6">Related Movies</h2>

        <Swiper
          className="container"
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2} // Set 4 slides to be visible by default
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          loop={true} // Enable loop through slides
          modules={[EffectCoverflow]} // Use EffectCoverflow module
          style={{
            width: "100%", // Ensure the Swiper container takes full width
            height: "auto", // Set a fixed height for the Swiper container
            marginTop: "20px", // Add space above the Swiper
          }}
          breakpoints={{
            // Show 4 slides when screen width is greater than 1024px
            1024: {
              slidesPerView: 4,
            },
            // Show 2 slides when screen width is less than or equal to 768px
            768: {
              slidesPerView: 2,
            },
          }}
        >
          {relatedMovies.map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard movie={movie} />{" "}
              {/* MovieCard component to display related movie */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieDetail;
