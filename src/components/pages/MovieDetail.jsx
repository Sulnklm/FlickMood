import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import MovieCard from "../elements/MovieCard";
import RatingBox from "../elements/Rating";
import FavBtn from "../elements/FavBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../index.css";

const API_KEY = "0e16d9b4af07e316bb36fc1286684dd6";
const BASE_URL = "https://api.themoviedb.org/3";

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

  // Mouse drag handlers
  const castScrollContainer = useRef(null);
  const handleCastMouseDown = (e) => {
    const container = castScrollContainer.current;
    container.isMouseDown = true;
    container.startX = e.pageX - container.offsetLeft;
    container.scrollLeftStart = container.scrollLeft;
  };
  const handleCastMouseMove = (e) => {
    const container = castScrollContainer.current;
    if (!container.isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - container.startX) * 1.5; // scroll speed
    container.scrollLeft = container.scrollLeftStart - walk;
  };
  const handleCastMouseUp = () => {
    const container = castScrollContainer.current;
    container.isMouseDown = false;
  };
  const preventDrag = (e) => {
    e.preventDefault(); // image 이미지 기본 드래그 동작 차단
  };

  // Review expand/collapse
  const [expandedReviewId, setExpandedReviewId] = useState(null);
  const handleToggleReview = (reviewId) => {
    if (expandedReviewId === reviewId) {
      setExpandedReviewId(null);
    } else {
      setExpandedReviewId(reviewId);
    }
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

  // Movie details fetching function
  const fetchMovieDetails = async () => {
    setLoading(true);
    setError(null); // 오류 초기화

    try {
      // Compare this snippet from src/components/home/main/Trending.jsx:
      const movieResponse = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
        },
      });

      setMovieDetails(movieResponse.data); // movie details update

      // FavBtn
      const savedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setIsFavorite(savedFavorites.includes(movieId));

      // Same Genre Movies
      const genreIds = movieResponse.data.genres.map((genre) => genre.id);
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

      // cast
      const castResponse = await axios.get(
        `${BASE_URL}/movie/${movieId}/credits`,
        {
          params: {
            api_key: API_KEY,
          },
        }
      );
      setCast(castResponse.data.cast); // cast update

      // trailer
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
      setTrailer(trailerData); // trailer update

      // reviews
      const reviewsResponse = await axios.get(
        `${BASE_URL}/movie/${movieId}/reviews`,
        {
          params: {
            api_key: API_KEY,
          },
        }
      );
      // Filter reviews with ratings and limit to 4 reviews
      const filteredReviews = reviewsResponse.data.results
        .filter((review) => review.author_details.rating)
        .slice(0, 4);
      setReviews(filteredReviews); // reviews update
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
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(savedFavorites.includes(movieId));
  }, [movieId]);

  if (loading) return <div className="text-white/50 justify-self-center mt-10 min-h-screen">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="2xl:max-w-[80vw] container mx-auto mt-5">
      <div>
        {movieDetails && (
          <div>
            <div className="lg:flex items-center space-y-5 gap-5">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="max-w-[20rem] w-full h-auto rounded-md mx-auto"
                loading="lazy"
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
                  <div
                    ref={castScrollContainer}
                    className="overflow-x-auto flex flex-nowrap gap-5 scrollbar-hide max-w-full"
                    style={{
                      cursor: "grab",
                      userSelect: "none",
                      WebkitOverflowScrolling: "touch",
                    }}
                    onMouseDown={handleCastMouseDown}
                    onMouseMove={handleCastMouseMove}
                    onMouseLeave={handleCastMouseUp}
                    onMouseUp={handleCastMouseUp}
                    onDragStart={preventDrag}
                  >
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
                loading="lazy"
              />
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="container mx-auto bg-customGreen rounded-[20px] p-5 xl:p-10 mt-5">
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

      <div className="container mx-auto md:p-5 grid pb-7 xl:p-10 bg-customGreen rounded-[20px] m-5">
        <h2 className="mb-7 pt-5 md:p-0 px-5 md:px-0">You May Also Like</h2>
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
