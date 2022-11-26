import { AdminPassword } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookieJwtAuth } from "../middleware/cookie-jwt-auth";

export const adminRouter = express.Router();

adminRouter.post("/", cookieJwtAuth, (req, res) => {
  {
    const password = req.params;
    if (password === undefined || typeof password !== "string") {
      return res.status(400).json({
        message: "Valid password is required!",
      });
    }
    if (!login(password)) {
      return res.status(403).json({
        message: "Invalid password!",
      });
    }

    const token = jwt.sign({}, process.env.AUTH_SECRET_KEY, {
      expiresIn: "2h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "Success!",
      //TODO: secure: true later on
      //maxAge: 1000000
      // signed: true
    });

    return res.redirect("/admin");
  }
});

async function login(userPassword: string) {
  const password: AdminPassword = await prisma.adminPassword.findFirst();
  return await bcrypt.compare(password.password, userPassword);
}
