import { prisma } from "../lib/db.js";

export const usersService = {
  getAllUsers: async () => {
    return await prisma.user.findMany();
  },

  createUser: async (data) => {
    return await prisma.user.create({ data });
  },

  getUser: async (data) => {
    return await prisma.user.findUnique({
      where: data,
    });
  },
};
