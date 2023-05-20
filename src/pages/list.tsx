import React from "react";
import MainLayout from "../layouts/MainLayout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import path from "../utils/path";
import prisma from "../lib/prisma";
import { List } from "@prisma/client";
import AnimeGridLayout from "../layouts/AnimeGridLayout";
import AnimeCard from "../components/Anime/AnimeCard";
import Meta from "../components/Meta";

interface ListProps {
  list: List[];
}

const List: React.FC<ListProps> = ({ list }) => {
  return (
    <MainLayout>
      <Meta
        title="Next Anime"
        image="https://res.cloudinary.com/annnn/image/upload/v1683898263/logo_id1pyr.png"
        description="Next Anime is a free anime watch website built using Consumet API"
      />
      <div className="min-h-screen mt-[56px] p-4">
        <h4 className="md:text-4xl text-2xl font-semibold capitalize">
          My List
        </h4>

        {list?.length === 0 && (
          <h6 className="font-semibold mt-5 text-center">List is empty</h6>
        )}

        <AnimeGridLayout className="mt-5">
          {list?.map((item) => (
            <AnimeCard
              key={item.id}
              color={item.animeColor}
              id={item.animeId}
              image={item.animeImage}
              title={item.animeTitle}
              type={item.animeType}
            />
          ))}
        </AnimeGridLayout>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: `${path.signIn}`,
        permanent: false,
      },
    };
  }

  const list = await prisma!.list.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return {
    props: {
      list,
    },
  };
};

export default List;
