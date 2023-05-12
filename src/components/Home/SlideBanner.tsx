import "swiper/css";
import "swiper/css/navigation";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { Anime } from "@/src/types/anime";
import Banners from "./Banners";

interface SlideProps {
  tredingAnime: Anime[];
}

const SlideBanner: React.FC<SlideProps> = ({ tredingAnime }) => {
  return (
    <Swiper
      autoplay={{ delay: 5000 }}
      navigation={true}
      modules={[Navigation, Autoplay]}
    >
      {tredingAnime?.map((anime) => (
        <SwiperSlide key={anime?.id}>
          <Banners anime={anime} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideBanner;
