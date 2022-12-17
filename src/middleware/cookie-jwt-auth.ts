import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";

export const cookieJwtAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).clearCookie("token").json({
      error: "Invalid token!",
    });
  }
};
