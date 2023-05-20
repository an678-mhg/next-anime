import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { CreateCommentBody } from "@/src/types/comment";

const createComment = async (comment: CreateCommentBody) => {
  const newComment = await prisma!.comment.create({
    data: comment,
  });

  return newComment;
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
    }
  } catch (error) {
    res.status(500).send("Server not found!");
  }
};

export default handler;
