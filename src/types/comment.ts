import { User } from "@prisma/client";

export interface CreateCommentBody {
  animeId: string;
  userId: string;
  text: string;
}

export interface Comment {
  animeId: string;
  createdAt: Date;
  id: string;
  text: string;
  user: User;
  userId: string;
}
