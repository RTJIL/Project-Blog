export const isAdmin = (req, res, next) => {
  console.log("IS ADMIN ✅");
  if (req.user.role === "ADMIN") return next(); // NOTE: 'ADMIN' not 'Admin' — it's from enum Role
  return next(new Error("Not an admin"));
};
