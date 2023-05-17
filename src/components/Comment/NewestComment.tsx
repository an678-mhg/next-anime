import React, { useMemo } from "react";
import NewestCommentItem from "./NewestCommentItem";
import { Swiper, SwiperSlide } from "swiper/react";
import useInnerWidth from "@/src/hooks/useInnerWidth";
import TitlePrimary from "../TitlePrimary";

const NewestComment = () => {
  const width = useInnerWidth();

  const slidesPerView = useMemo(() => {
    return width >= 1200 ? 6.5 : width >= 1024 ? 4.5 : width >= 768 ? 2.5 : 1.5;
  }, [width]);

  return (
    <div className="w-full p-4 flex items-center mt-5">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <TitlePrimary title="Newest Comment" />
        </div>

        <div className="mt-5">
          <Swiper spaceBetween={20} slidesPerView={slidesPerView}>
            {Array.from(Array(20).keys()).map((item) => (
              <SwiperSlide key={item}>
                <NewestCommentItem />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default NewestComment;
