import React from "react";
import NewestCommentItem from "./NewestCommentItem";
import { SwiperSlide } from "swiper/react";
import TitlePrimary from "../TitlePrimary";
import { Comment } from "@/src/types/comment";
import SwiperContainer from "../SwiperContainer";

interface NewestCommentProps {
  comments: Comment[];
}

const NewestComment: React.FC<NewestCommentProps> = ({ comments }) => {
  return (
    <div className="w-full p-4 flex items-center mt-5">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <TitlePrimary title="Newest Comment" />
        </div>

        <div className="mt-5">
          <SwiperContainer
            lg={4.5}
            md={2.5}
            xl={6.5}
            sm={1.5}
            spaceBetween={20}
          >
            {comments.map((item) => (
              <SwiperSlide key={item.id}>
                <NewestCommentItem comment={item} />
              </SwiperSlide>
            ))}
          </SwiperContainer>
        </div>
      </div>
    </div>
  );
};

export default NewestComment;
