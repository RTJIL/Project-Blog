import { usersService } from "../services/usersService.js";

export const usersController = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await usersService.getAllUsers();
      res.json(users);
    } catch (err) {
      console.error(err.message); // 🔍 inspect this
      res.status(500).json({ error: "Something went wrong." });
    }
  },
};
