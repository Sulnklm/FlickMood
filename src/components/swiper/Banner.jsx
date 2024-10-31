import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BannerSliderData from "../../config/data.json";

function Banner() {
  const [bannerSlider, setBannerSlider] = useState([]);

  // Load banner slider data
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
                <div className="relative h-full">
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
                    <div className="lg:m-20 ml-5 text-white grid justify-center items-center">
                      <h1 className="lg:mb-4 mb-2">{movie.bannerMovieTitle}</h1>
                      <h3 className="max-w-[15rem] md:max-w-[25rem]">{movie.overview}</h3>                      
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
