import express from "express";
import { join } from "path";
import dotenv from "dotenv";
import { adminRouter, memberRouter, tagRouter } from "./routers";
import cookieParser from "cookie-parser";

dotenv.config({ path: join(__dirname, "../.env") });

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/admin", adminRouter);
app.use("/api/member", memberRouter);
// app.use("/api/image", imageRouter);
app.use("/api/tag", tagRouter);
app.use(
  express.static(
    join(
      __dirname,
      "../../streaming-frontend/dist/streaming-frontend"
    )
  )
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Hello test" });
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
