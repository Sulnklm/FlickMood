import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BannerSliderData from "../../config/data.json";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faVolumeXmark, faVolumeLow } from "@fortawesome/free-solid-svg-icons";
// import { icon } from "@fortawesome/fontawesome-svg-core";

function Banner() {
  const [bannerSlider, setBannerSlider] = useState([]);
  // const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setBannerSlider(BannerSliderData.bannerSlider);
  }, []);


  return (
    <div>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 10000, disableOnInteraction: true }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {bannerSlider.map((movie, index) => {
          
          return (
            <SwiperSlide key={movie.ranking || index}>
              <div>
                {/* Video and information section */}
                <div className="relative max-h-[50vh]">
                  <div className="absolute inset-0 bg-gradient-to-r from-black z-10 w-[50%]"></div>
                  <div className="flex items-center justify-center overflow-hidden relative w-full aspect-[4.78/2] lg:aspect-[4.78/2]">
                    <iframe
                      className="object-cover absolute left-0 w-full h-full border-0"
                      src={movie.videoUrl}
                      title={`${movie.bannerMovieTitle} video player`}
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div className="container mx-auto video">
                  <div className="grid justify-center items-center h-full absolute top-0 z-20">
                    <div className=" ml-5 text-white grid justify-center items-center space-y-5">
                      <h1>{movie.bannerMovieTitle}</h1>
                      <h3 className="max-w-[15rem] md:max-w-[25rem]">
                        {movie.overview}
                      </h3>
                      {/* <button
                        onClick={handleMuteToggle}
                        className="bg-white w-fit rounded-full"
                      >
                        <FontAwesomeIcon
                          icon={isMuted ? faVolumeXmark : faVolumeLow} 
                          className="p-3 px-5 text-purple-500 text-xl"
                        />
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Banner;
