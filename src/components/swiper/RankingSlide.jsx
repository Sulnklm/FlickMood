import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Card from "../others/Card";
import NowShowingData from "../../config/data.json";

function Ranking() {
  const [nowShowingSlider, setNowShowingSlider] = useState(true);
  const [comingSoonSlider, setComingSoonSlider] = useState(false);

  return (
    <div className="bg-slate-100 py-10">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="inline-flex space-x-3 lg:space-x-5 lg:px-5 p-3  items-center justify-center bg-purple-500 rounded-full drop-shadow-md mb-10">
            <button
              className={
                nowShowingSlider ? "text-white" : "text-purple-300"
              }
              onClick={() => {
                setNowShowingSlider(true);
                setComingSoonSlider(false);
              }}
            >
              <h2 className="sm:font-2xs ">Now Showing</h2>
            </button>

            <p className="text-gray-300 text-sm flex align-items-center">|</p>

            <button
              className={
                comingSoonSlider ? "text-white" : "text-purple-300"
              }
              onClick={() => {
                setNowShowingSlider(false);
                setComingSoonSlider(true);
              }}
            >
              {" "}
              <h2>Coming Soon</h2>
            </button>
          </div>
        </div>
        {/* Slider */}
        <div className="">
          {/* nowShowingSlider */}
          {nowShowingSlider && (
            <div>
              {nowShowingSlider}
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"4"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: false,
                }}
                loop={true}
                modules={[EffectCoverflow]}
              >
                {NowShowingData.nowShowingMovie.map((movie, index) => (
                  <SwiperSlide key={index}>
                    <Card movie={movie} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* comingSoonSlider */}
          {comingSoonSlider && (
            <div>
              {comingSoonSlider}
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"4"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: false,
                }}
                loop={true}
                modules={[EffectCoverflow]}
              >
                {NowShowingData.comingSoonMovie.map((movie, index) => (
                  <SwiperSlide key={index}>
                    <Card movie={movie} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ranking;
