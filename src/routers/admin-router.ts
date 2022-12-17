import { AdminPassword } from "../../generated/client";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookieJwtAuth } from "../middleware/cookie-jwt-auth";
import prisma from "../prisma";

export const adminRouter = express.Router();

adminRouter.post("/login", async (req, res) => {
  {
    const password = req.body.password;

    if (password === undefined || typeof password !== "string") {
      return res.status(401).json({
        message: "Valid password is required!",
      });
    }

    let isLoggedIn = await login(password);

    console.log("isLoggedIn1", isLoggedIn);

    if (!isLoggedIn) {
      return res.status(401).json({
        message: "Invalid password!",
      });
    }    

    const token = jwt.sign({}, process.env.AUTH_SECRET_KEY, {
      expiresIn: "2h",
    });

    console.log("token", token);
    

    res
      .status(200)
      .cookie("token", token, {
        sameSite: "strict",
        // httpOnly: true,
        //TODO: secure: true later on
        //maxAge: 1000000
        // signed: true
      })
      .json({
        message: "Logged in!",
      });
  }
});

async function login(userPassword: string): Promise<boolean> {
  const passwords: AdminPassword[] = await prisma.adminPassword.findMany();
  for (const { password } of passwords) {
    let result = await bcrypt.compare(userPassword, password);

    if (result) {
      return true;
    }
  }
  return false;
}
