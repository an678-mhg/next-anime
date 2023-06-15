import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { CreateCommentBody } from "@/src/types/comment";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Like } from "@prisma/client";

const createComment = async (
  comment: CreateCommentBody,
  session: Session | null,
  res: NextApiResponse
) => {
  if (!session?.user) {
    return res.status(400).json("User not login");
  }

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

const getCommentByEpisodeId = async (
  animeId: string,
  session: Session | null
) => {
  let likes: Like[] | undefined = [];

  const comments = await prisma!.comment.findMany({
    where: {
      animeId,
    },
    include: {
      user: true,
      _count: {
        select: {
          like: true,
        },
      },
    },
  });

  if (session?.user) {
    likes = await prisma?.like?.findMany({
      where: {
        commentId: {
          in: comments?.map((item) => item.id),
        },
        userId: session?.user?.id,
      },
    });
  }

  return comments?.map((item) => ({
    ...item,
    isLiked: likes?.some((p) => p.commentId === item.id),
  }));
};

const deleteComment = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session | null
) => {
  if (!session?.user) {
    return res.status(400).json("User not login");
  }

  const comment = await prisma?.comment?.findFirst({
    where: { id: req.query.id as string },
  });

  if (!comment) {
    return res.status(404).json("Comment not found");
  }

  if (comment.userId !== session?.user?.id) {
    return res.status(404).json("Something went wrong");
  }

  await Promise.all([
    prisma?.comment?.delete({
      where: { id: req.query.id as string },
    }),
    prisma?.like?.deleteMany({
      where: {
        id: comment?.id,
      },
    }),
  ]);

  res.json("Delete comment success");
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (req.method === "POST") {
      const commentBody = req.body as CreateCommentBody;
      const newComment = await createComment(commentBody, session, res);
      return res.json(newComment);
    } else if (req.method === "GET") {
      const comments = await getNewestComment();
      return res.json(comments);
    } else if (req.method === "PUT") {
      const { animeId } = req.body;
      const comments = await getCommentByEpisodeId(animeId, session);
      return res.json(comments);
    } else {
      deleteComment(req, res, session);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server not found!");
  }
};

export default handler;
