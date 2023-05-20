import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/src/lib/prisma";

const handleAddList = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401).json("User not login");
  }

  const { animeId, animeImage, animeTitle, animeType, animeColor } = req.body;

  const existList = await prisma!.list.findFirst({
    where: {
      animeId,
      userId: session?.user?.id,
    },
  });

  let status = "Add";

  if (existList) {
    await prisma!.list.delete({ where: { id: existList.id } });
    status = "Delete";
  } else {
    await prisma!.list.create({
      data: {
        animeColor,
        animeId,
        animeImage,
        animeTitle,
        animeType,
        userId: session?.user?.id,
      },
    });
  }

  res.json({ status });
};

const checkAnimeInList = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401).json("User not login");
  }

  const animeId = req.query?.animeId as string;

  if (!animeId) {
    return res.status(400).json("Animeid is required");
  }

  const check = await prisma!.list.findFirst({
    where: {
      animeId,
      userId: session?.user?.id,
    },
  });

  if (check) {
    res.json(check);
  } else {
    res.json(null);
  }
};

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      return checkAnimeInList(req, res);
    }

    if (req.method === "POST") {
      return handleAddList(req, res);
    }
  } catch (error) {
    res.status(500).send("Server not found!");
  }
};

export default handler;
