import { prisma } from "../lib/db.js";

export const tagsService = {
  createTag: async (data) => prisma.tag.create(data),
};
