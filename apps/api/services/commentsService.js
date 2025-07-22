import { prisma } from "../lib/db.js";

export const commentsService = {
  getAllComments: async () =>
    prisma.comment.findMany({
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    }),

  getCommentsById: async (postId) =>
    prisma.comment.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    }),

  createComment: async (data) => prisma.comment.create(data),
};
