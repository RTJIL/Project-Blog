import bcrypt from "bcrypt";
import { usersService } from "../services/usersService.js";
import { signJwt } from "../utils/signJwt.js";

export const authController = {
  register: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const hashed = await bcrypt.hash(password, 10);

      const user = await usersService.createUser({
        username,
        password: hashed,
      });
      res.json({ message: "User created✅", user });
    } catch (err) {
      next(err);
    }
  },

  logIn: async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) throw new Error("Username or password missed");

    try {
      const user = await usersService.getUser({ username });
      if (!user) return res.json({ message: "User not exists" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.json({ message: "Password not match" });

      const token = await signJwt(user);
      res.json({ token });
    } catch (err) {
      next(err);
    }
  },

  verify: async (req, res) => {
    res.status(200).json({ message: "User is authenticated", user: req.user });
  },
};
