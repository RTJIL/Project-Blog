import jwt from "jsonwebtoken";
import { PRIV_KEY } from "../config/env.js";

export const signJwt = (user) => {
  return new Promise((res, rej) => {
    jwt.sign(
      { sub: user.id, username: user.username, role: user.role },
      PRIV_KEY,
      { algorithm: "RS256", expiresIn: "2d" },
      function (err, token) {
        if (err) return rej(err);
        res(token);
      },
    );
  });
};
