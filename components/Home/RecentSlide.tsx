import { Swiper, SwiperSlide } from "swiper/react";
import { RecentAnime } from "@/types/anime";
import AnimeCard from "../Card/AnimeCard";
import useInnerWidth from "@/hooks/useInnerWidth";
import { useMemo } from "react";

interface RecentSlideProps {
  recentAnime: RecentAnime[];
}

const RecentSlide: React.FC<RecentSlideProps> = ({ recentAnime }) => {
  const width = useInnerWidth();

  const slidesPerView = useMemo(() => {
    return width >= 1280 ? 6 : width >= 1024 ? 5 : width >= 768 ? 4 : 3;
  }, [width]);

  return (
    <div>
      <h3 className="font-semibold text-xl text-[#cae962]">
        Recent Anime Episodes
      </h3>
      <Swiper className="mt-5" spaceBetween={10} slidesPerView={slidesPerView}>
        {recentAnime?.map((anime) => (
          <SwiperSlide key={anime?.id}>
            <AnimeCard
              title={
                anime?.title?.english || (anime?.title?.userPreferred as string)
              }
              type={anime?.type}
              image={anime?.image}
              newEpisodes={{
                episodeId: anime?.episodeId,
                episodeTitle: anime?.episodeTitle,
                episodeNumber: anime?.episodeNumber,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecentSlide;
