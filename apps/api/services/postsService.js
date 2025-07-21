import { prisma } from "../lib/db.js";

export const postsService = {
  getAllPosts: async () => await prisma.post.findMany(),

  getPostById: async (id) => await prisma.post.findUnique({ where: { id } }),

  createPost: async (data) => await prisma.post.create(data),

  deletePost: async (id) => {
    await prisma.post.delete({ where: { id } });
  },
};
