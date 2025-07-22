import express from "express";
import cors from "cors";

import { PORT } from "./config/env.js";

import { usersRouter } from "./routes/usersRouter.js";
import { authRouter } from "./routes/authRouter.js";
import { postsRouter } from "./routes/postsRouter.js";
import { commentsRouter } from "./routes/commentsRouter.js";
import { tagsRouter } from "./routes/tagsRouter.js";

// import passport from "./config/passport.js";

const app = express();

//serve
app.use(express.json());
app.use(cors());
// app.use(passport.initialize());

app.use("/api.odin.blog/v1/auth", authRouter);
app.use("/api.odin.blog/v1/users", usersRouter);
app.use("/api.odin.blog/v1/posts", postsRouter);
app.use("/api.odin.blog/v1/comments", commentsRouter);
app.use("/api.odin.blog/v1/tags", tagsRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("It was an error: ", err);
  res.json({ message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log("Server started on port: ", PORT);
});
