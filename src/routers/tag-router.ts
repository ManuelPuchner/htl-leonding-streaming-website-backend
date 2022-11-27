import { Tag } from "@prisma/client";
import * as express from "express";
import { getAllTags, getTagById, postTag, editTag } from "./../repos/tag-repo";

export const tagRouter = express.Router();

tagRouter.get("/", async (req, res) => {
  const tags: Tag[] = await getAllTags();
  res.status(200).json(tags);
});

tagRouter.get("/:id", async (req, res) => {
  const tagId = Number(req.params.id);
  if (tagId === undefined || tagId === null) {
    res.status(400).json({
      message: "Invalid tag id",
    });
    return;
  }

  const tag = await getTagById(tagId);
  res.status(200).json(tag);
});

tagRouter.post("/", async (req, res) => {
  const { name, color } = req.body;
  if (color === undefined || color === null) {
    res.status(400).json({
      message: "Invalid tag color",
    });
  }
  if (name === undefined || name === null) {
    res.status(400).json({
      message: "Invalid tag name",
    });
    return;
  }

  const tag = await postTag(name, color);
  res.status(200).json(tag);
});

tagRouter.put("/:id", async (req, res) => {
  const tagId = Number(req.params.id);
  if (tagId === undefined || tagId === null) {
    res.status(400).json({
      message: "Invalid tag id",
    });
    return;
  }
  const { name, color } = req.body;
  if (!tagValidation(name, color)) {
    res.status(400).json({
      message: "Invalid tag name or color",
      name: name,
      color: color,
    });
    return;
  }
  const tag = await editTag(tagId, name, color);
  res.status(200).json(tag);
});

function tagValidation(name: any, color: any) {
  return (
    name === undefined ||
    name === null ||
    typeof name !== "string" ||
    (name.trim().length === 0 && color === undefined) ||
    color === null ||
    typeof color !== "string" ||
    color.trim().length === 0
  );
}
