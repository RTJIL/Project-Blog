import { prisma } from "../lib/db.js";

export const postsService = {
  getAllPosts: async () =>
    await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: true,
      },
    }),

  getPostsByQuery: async (query) =>
    await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            tags: {
              some: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: true,
      },
    }),

  getPostById: async (id) =>
    await prisma.post.findUnique({
      where: { id },
      include: {
        tags: true,
      },
    }),

  createPost: async (data) => await prisma.post.create(data),

  deletePost: async (id) => {
    await prisma.post.delete({ where: { id } });
  },
};
