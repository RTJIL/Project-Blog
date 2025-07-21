import { postsService } from "../services/postsService.js";

export const postsController = {
  getAllPosts: async (req, res, next) => {
    try {
      const posts = await postsService.getAllPosts();
      return res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  },

  getPostById: async (req, res, next) => {
    const postId = Number(req.params.postId);

    try {
      const post = await postsService.getPostById(postId);
      return res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  },

  createPost: async (req, res, next) => {
    console.log("Creating post...");

    const data = req.body;

    try {
      const posts = await postsService.createPost({
        data: {
          title: data.title,
          content: data.content,
          cover_url: data.cover_url,
          read_time: data.read_time,
          authorId: req.user.id,
        },
      });
      return res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  },

  deletePost: async () => {},
};

/**
 * 
{
    "read_time": "9m",
    "title": "How I remake daily dev style",
    "cover_url": "https://pzayzfkambqnvlzxqlbb.supabase.co/storage/v1/object/public/files-container//chrome_89hmya6CKQ.png",
    "content": "I've remake desing of daily dev by myself using AI tools and my own skills. So now I'm gonna tell u how to do that. Just take 5 grams of ganja to be ready for it..."
}
 */

/**
 * eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoicnR0Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NTMwOTMxMDUsImV4cCI6MTc1MzI2NTkwNX0.kTb_xrHpS_xu7e5ul8IxkJ4l8ek_cFPPjDWOCeMY4n4isVKjXTSwG4c-mu5gv9u3hO_npL_LBQejms0tP_zqOsb-iGE99Jm0SHDyAWwkoKH-CMmY5xTEH6L7CtUa1mjVZLBS90AgIrDLXEtwA65xLdOuVavMcvQhsiFUiB3NepwHM6J2k2aL_8HhkxbPelTKg1ICzUZtWxDBx87MmFr8tnA2PKzcnfOQ2BRT3rSYh7cC4zJk6OULrCKiJYRx12hkBmW_GpZNup0w95vhE0LRkbLR_F0t85OtUHzTLnJxHzxcE4S6k3w0ZmtBfzV5WcoUIqrAUd9_xFWy4ZjM-Sfmbg
 */

/**
{
"username": "rtt",
"password": "rtt"
}

 */
