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

interface ListProps {
  list: List[];
}

const List: React.FC<ListProps> = ({ list }) => {
  return (
    <MainLayout>
      <div className="max-h-screen mt-[56px] p-4">
        <h4 className="md:text-4xl text-2xl font-semibold">My List</h4>

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

  const list = await prisma.list.findMany({
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
