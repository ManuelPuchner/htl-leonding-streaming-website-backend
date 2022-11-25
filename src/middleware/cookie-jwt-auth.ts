import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";

export const cookieJwtAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).json({
      error: error,
    });
    res.clearCookie("token");
    return res.redirect("/");
  }
};
