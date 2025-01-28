import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BannerSliderData from "/public/data/trailers.json";

function Trailers() {
  const [bannerSlider, setBannerSlider] = useState([]);
  useEffect(() => {
    setBannerSlider(BannerSliderData.bannerSlider);
  }, []);

  return (
    <div>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 80000, disableOnInteraction: true }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {bannerSlider.map((movie, index) => {
          return (
            <SwiperSlide key={movie.ranking || index}>
              <div>
                {/* Video and information section */}
                <div className="relative max-h-[50vh]">
                  <div className="rounded-[20px] flex items-center justify-center overflow-hidden relative w-full aspect-[4.78/2] lg:aspect-[4.78/2]">
                    <iframe
                      className="object-cover absolute left-0 w-full h-full border-0"
                      src={movie.videoUrl}
                      title={`${movie.bannerMovieTitle} video player`}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
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

export default Trailers;
