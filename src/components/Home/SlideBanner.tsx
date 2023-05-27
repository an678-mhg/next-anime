import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { Anime } from "@/src/types/anime";
import Banners from "./Banners";

interface SlideProps {
  tredingAnime: Anime[];
}

const SlideBanner: React.FC<SlideProps> = ({ tredingAnime }) => {
  return (
    <Swiper
      autoplay={{ delay: 5000 }}
      modules={[Autoplay, Pagination]}
      pagination
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
