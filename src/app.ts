import express from "express";
import { join } from "path";
import dotenv from "dotenv";
import { adminRouter, memberRouter, tagRouter, testRouter } from "./routers";
import cookieParser from "cookie-parser";

dotenv.config({ path: join(__dirname, "../.env") });

const app = express();

const PORT = 3000;

const BASE_URL = process.env.NODE_ENV == "production" ? "" : "/api";

app.use(express.json());
app.use(cookieParser());
app.use(`/api/admin`, adminRouter);
app.use("/api/member", memberRouter);
// app.use("/api/image", imageRouter);
app.use("/api/tag", tagRouter);
app.use("/api/test", testRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}, http://localhost:${PORT}`);
  console.log({
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY,
  });
  
});
