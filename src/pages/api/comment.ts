import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { CreateCommentBody } from "@/src/types/comment";

const createComment = async (comment: CreateCommentBody) => {
  const newComment = await prisma!.comment.create({
    data: comment,
  });

  return newComment;
};

const getNewestComment = async () => {
  const comments = await prisma!.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
    include: {
      user: true,
    },
  });

  return comments;
};

const getCommentByEpisodeId = async (episodeId: string, animeId: string) => {
  const comments = await prisma!.comment.findMany({
    where: {
      animeId,
      episodeId,
    },
    include: {
      user: true,
    },
  });

  return comments;
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "POST") {
      const commentBody = req.body as CreateCommentBody;
      const newComment = await createComment(commentBody);
      return res.json(newComment);
    } else if (req.method === "GET") {
      const comments = await getNewestComment();
      return res.json(comments);
    } else if (req.method === "PUT") {
      const { animeId, episodeId } = req.body;
      const comments = await getCommentByEpisodeId(episodeId, animeId);
      return res.json(comments);
    } else {
      await prisma?.comment.delete({
        where: {
          id: req.query.id as string,
        },
      });

      return res.json("Delete comment success!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server not found!");
  }
};

export default handler;
