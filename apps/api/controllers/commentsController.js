import { commentsService } from "../services/commentsService.js";

export const commentsController = {
  getAllComments: async (req, res, next) => {
    try {
      const comments = await commentsService.getAllComments();
      return res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  },

  getCommentsById: async (req, res, next) => {
    const { postId } = req.params;

    try {
      const comments = await commentsService.getCommentsById(Number(postId));
      return res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  },

  createComment: async (req, res, next) => {
    const data = req.body;

    try {
      const comment = await commentsService.createComment({
        data: {
          message: data.message,
          postId: Number(data.postId),
          authorId: Number(data.authorId),
        },
      });
      return res.status(200).json(comment);
    } catch (err) {
      next(err);
    }
  },
};
