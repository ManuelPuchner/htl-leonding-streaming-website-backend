import express from "express";
import { join } from "path";
import dotenv from "dotenv";
import { adminRouter, memberRouter, tagRouter } from "./routers";
import cookieParser from "cookie-parser";

dotenv.config({ path: join(__dirname, "../.env") });

const app = express();

const PORT = 3000;

const BASE_URL = process.env.NODE_ENV == "production" ? "" : "/api";

app.use(express.json());
app.use(cookieParser());
app.use(`${BASE_URL}/admin`, adminRouter);
app.use(`${BASE_URL}/member`, memberRouter);
// app.use(`${BASE_URL}/image`, imageRouter);
app.use(`${BASE_URL}api/tag`, tagRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.listen(PORT, () => console.log(`Running on port ${PORT}, http://localhost:${PORT}`));
