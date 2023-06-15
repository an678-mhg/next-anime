import { NextApiHandler } from "next";
import prisma from "@/src/lib/prisma";

const handler: NextApiHandler = async (req, res) => {
  try {
    const { userId, commentId } = req.body;

    const checkLike = await prisma?.like.findFirst({
      where: {
        userId,
        commentId,
      },
    });

    if (!checkLike) {
      const likeCreated = await prisma?.like?.create({
        data: {
          commentId,
          userId,
        },
      });

      res.json({ likeCreated });
    } else {
      await prisma?.like?.delete({
        where: {
          id: checkLike?.id,
        },
      });

      res.json({});
    }
  } catch (error) {
    res.status(500).send("Server not found!");
  }
};

export default handler;
