import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css"; // Swiper 기본 스타일
import "swiper/css/effect-coverflow"; // Coverflow 효과를 위한 스타일
import MovieCard from "../elements/MovieCard"; // MovieCard 컴포넌트
import RatingBox from "../elements/Rating";
import FavBtn from "../elements/FavBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../index.css";

const API_KEY = "0e16d9b4af07e316bb36fc1286684dd6"; // The Movie DB API 키
const BASE_URL = "https://api.themoviedb.org/3"; // The Movie DB API URL

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [expandedReviewId, setExpandedReviewId] = useState(null); // 어떤 리뷰가 확장된 상태인지 추적

  const handleToggleReview = (reviewId) => {
    if (expandedReviewId === reviewId) {
      setExpandedReviewId(null); // 이미 확장된 리뷰를 다시 클릭하면 축소
    } else {
      setExpandedReviewId(reviewId); // 리뷰 확장
    }
  };

  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
  };

  const handleFavoriteChange = (movieId) => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (savedFavorites.includes(movieId)) {
      const updatedFavorites = savedFavorites.filter((id) => id !== movieId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      savedFavorites.push(movieId);
      localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    }
  };

  // 영화 상세 정보와 관련 영화, 등장인물, 트레일러 불러오기
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

      // 좋아요 상태 확인
      const savedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setIsFavorite(savedFavorites.includes(movieId));

      // 같은 장르의 관련 영화 가져오기
      const genreIds = movieResponse.data.genres.map((genre) => genre.id); // 영화의 장르 ID들
      if (genreIds.length > 0) {
        const relatedResponse = await axios.get(`${BASE_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            with_genres: genreIds.join(","), // Join genre IDs with commas
          },
        });

        setRelatedMovies(relatedResponse.data.results); // Update related movies state
      } else {
        setRelatedMovies([]); // If no genres, set related movies to empty array
      }

      // 등장인물 정보 불러오기
      const castResponse = await axios.get(
        `${BASE_URL}/movie/${movieId}/credits`,
        {
          params: {
            api_key: API_KEY,
          },
        }
      );
      setCast(castResponse.data.cast); // 등장인물 정보 상태 업데이트

      // 트레일러 정보 불러오기
      const trailerResponse = await axios.get(
        `${BASE_URL}/movie/${movieId}/videos`,
        {
          params: {
            api_key: API_KEY,
          },
        }
      );
      const trailerData = trailerResponse.data.results.find(
        (video) => video.type === "Trailer"
      );
      setTrailer(trailerData); // 트레일러 상태 업데이트

      // 리뷰 정보 불러오기
      const reviewsResponse = await axios.get(
        `${BASE_URL}/movie/${movieId}/reviews`,
        {
          params: {
            api_key: API_KEY,
          },
        }
      );
      // 평점이 있는 리뷰만 필터링하여 최대 4개만 표시
      const filteredReviews = reviewsResponse.data.results
        .filter((review) => review.author_details.rating) // 평점이 있는 리뷰만 필터링
        .slice(0, 4); // 최대 4개 리뷰만
      setReviews(filteredReviews); // 리뷰 정보 상태 업데이트
    } catch (err) {
      setError("Failed to load movie data.");
      console.error(err); // Log error if API request fails
    } finally {
      setLoading(false); // Set loading to false after data fetching is complete
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    // 좋아요 상태 업데이트 후 로컬 스토리지에서 새로 가져오기
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(savedFavorites.includes(movieId));
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="2xl:max-w-[80vw] container mx-auto mt-5">
      <div className="container mx-auto md:p-5">
        {movieDetails && (
          <div>
            <div className="lg:flex items-center space-y-5 gap-5">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="max-w-[20rem] w-full h-auto rounded-md mx-auto"
              />
              <div className="bg-customGreen p-5 xl:p-10 rounded-[20px]">
                <div className="grid lg:flex items-center gap-3">
                  <h1 className="font-[500] order-2 lg:order-1">
                    {movieDetails.title}
                  </h1>
                  <div className="flex gap-3 order-1 lg:order-2 items-center">
                    <RatingBox rating={movieDetails.vote_average.toFixed(1)} />
                    <FavBtn
                      movieId={movieId}
                      isFavorite={isFavorite}
                      onFavoriteChange={handleFavoriteChange}
                    />
                  </div>
                </div>
                <div className="lg:flex gap-3 items-center opacity-60 mb-5 lg:mb-8">
                  <p>{movieDetails.release_date}</p>
                  <p>
                    {movieDetails.genres.map((genre) => genre.name).join("∙") ||
                      ""}
                  </p>
                </div>
                <div>
                  <p className="text-xl font-[500] mb-2">Overview</p>
                  <p className="opacity-80">{movieDetails.overview}</p>
                </div>

                <hr className="my-8 lg:my-10 opacity-20" />

                {/* Cast */}
                <div>
                  <p className="text-lg font-[500] mb-5">Top Billed Cast</p>
                  <div className="overflow-x-auto flex flex-nowrap gap-5 scrollbar-hide max-w-full">
                    {cast.length > 0 ? (
                      cast.slice(0, 6).map((actor) => (
                        <div
                          key={actor.cast_id}
                          className="grid place-items-center shrink-0 mr-4"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                            alt={actor.name}
                            className="max-w-[8rem] w-full h-auto aspect-square rounded-full mx-auto object-cover"
                          />
                          <p className="mt-3 opacity-70">{actor.name}</p>
                        </div>
                      ))
                    ) : (
                      <p>No cast information available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto mt-5">
          {trailer ? (
            <div className="relative pt-[56.25%]">
              <iframe
                title="Trailer"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                className="absolute top-0 left-0 w-full h-full rounded-[20px]"
                allowFullScreen
              />
            </div>
          ) : (
            <p>No trailer available</p>
          )}
        </div>

        <div className="container mx-auto bg-customGreen rounded-[20px] p-5 xl:p-10 m-5">
          <h2 className="mb-5">Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={review.id} className="mb-5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2 items-start">
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-500"
                      />
                      {review.author_details.rating && (
                        <p className="text-2xl font-[450]">
                          {`${review.author_details.rating}/10`}
                        </p>
                      )}
                    </div>
                    <p className="my-2 font-[500]">{review.author}</p>
                  </div>
                </div>

                <p className="opacity-80 font-[300]">
                  {review.content.length > 100 ? (
                    <span>
                      {expandedReviewId === review.id
                        ? review.content
                        : review.content.slice(0, 300) + "..."}
                      <button
                        onClick={() => handleToggleReview(review.id)}
                        className="text-customMint ml-2 underline"
                      >
                        {expandedReviewId === review.id
                          ? "Show less"
                          : "Show more"}
                      </button>
                    </span>
                  ) : (
                    review.content
                  )}
                </p>
                {index < reviews.length - 1 && (
                  <hr className="my-10 opacity-20" />
                )}
              </div>
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </div>
      </div>

      <div className="container mx-auto grid p-5 xl:p-10 bg-customGreen rounded-[20px] m-5">
        <h2 className="mb-7">You May Also Like</h2>
        <Swiper
          className="container"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={2000}
          breakpoints={{
            1024: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 3,
            },
          }}
        >
          {relatedMovies.map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard
                movie={movie}
                isFavorite={isFavorite}
                onFavoriteChange={handleFavoriteChange}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieDetail;
