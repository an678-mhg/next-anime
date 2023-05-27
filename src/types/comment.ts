import { User } from "@prisma/client";

export interface CreateCommentBody {
  animeId: string;
  userId: string;
  text: string;
  episodeId: string;
}

export interface Comment {
  animeId: string;
  createdAt: Date;
  id: string;
  text: string;
  user: User;
  userId: string;
  episodeId: string;
}
