import { validateToken } from "../lib/auth.js";

export const authMiddleware = async (req, res, next) => {
  const authorization = req.headers.cookie;
  if (!authorization) {
    return res.status(403).json({ msg: "Authentication failed." });
  }
  try {
    const token = authorization.split("=")[1].split(";")[0];
    if (!token) {
      return res
        .status(403)
        .json({ msg: "Authentication failed. Token broken." });
    }
    req.user = await validateToken(token);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ error, msg: "Authentication failed." });
  }
};
