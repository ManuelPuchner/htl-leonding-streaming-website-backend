import express from "express";
import { join } from "path";
const app = express();

const PORT = 3000;


app.use(express.json());
app.use(express.static(join(__dirname, "../../htl-leonding-streaming-website-frontend/dist/streaming-frontend")));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});


app.get("/test", (req, res) => {
  res.status(200).json({ message: "Hello test" });
});


app.listen(PORT, () => console.log(`Running on port ${PORT}`));
