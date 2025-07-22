import passport from "../config/passport.js";

export const isAuth = (req, res, next) => {
  console.log("IS AUTH ✅");
  return passport.authenticate("jwt", { session: false })(req, res, next);
};

/** Custom
 * const isAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ message: "No token" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // manually inject user info
    next()
  } catch (err) {
    res.status(401).json({ message: "Invalid token" })
  }
}
 */

/**
 * So here’s the real deal again:
When you do this:

export const isAuth = (req, res, next) => {
  console.log("IS AUTH ✅");
  return passport.authenticate("jwt", { session: false })(req, res, next); // THIS LINE runs it instantly
};
👆 You’re saying:

“Yo Passport, here’s the req, res, next, do your thing and call next() only if the user is authenticated.”

Why the (req, res, next)?
Because:

passport.authenticate("jwt", { session: false })
just returns a function. If you don’t call that function, it never runs.

You need to slap it with:

(req, res, next)
To actually let it do its job.
 */
