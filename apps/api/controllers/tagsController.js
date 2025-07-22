import { tagsService } from "../services/tagsService.js";

export const tagsController = {
  createTag: async (req, res, next) => {
    const data = req.body;

    try {
      const tag = await tagsService.createTag({
        data: {
          name: data.tagName,
        },
      });
      return res.status(200).json(tag);
    } catch (err) {
      next(err);
    }
  },
};
