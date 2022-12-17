import express from "express";
import { join } from "path";
import dotenv from "dotenv";
import { adminRouter, memberRouter, tagRouter, testRouter } from "./routers";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config({ path: join(__dirname, "../.env") });

const app = express();

const PORT = 3000;

if(process.env.NODE_ENV == "development") {
  app.use(cors({
    credentials: true,
    origin: "http://localhost:4200"
  }))
}

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
});
