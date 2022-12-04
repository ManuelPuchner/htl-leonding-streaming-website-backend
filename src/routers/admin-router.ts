import { AdminPassword } from "../../generated/client";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookieJwtAuth } from "../middleware/cookie-jwt-auth";

export const adminRouter = express.Router();

adminRouter.post("/login", (req, res) => {
  {
    const password = req.body.password;
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
      sameSite: "strict",
      // httpOnly: true,
      //TODO: secure: true later on
      //maxAge: 1000000
      // signed: true
    });

    res.status(200).json({
      message: "Success!",
    });
  }
});

async function login(userPassword: string): Promise<boolean> {
  const passwords: AdminPassword[] = await prisma.adminPassword.findMany();
  for (const password of passwords) {
    let result = await bcrypt.compare(userPassword, password.password);
    if (result) {
      return true;
    }
  }
  return false;
}
