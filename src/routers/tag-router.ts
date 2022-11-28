import { Tag } from "@prisma/client";
import * as express from "express";
import { cookieJwtAuth } from "../middleware/cookie-jwt-auth";
import {
  getAllTags,
  getTagById,
  postTag,
  editTag,
  deleteTag,
} from "./../repos/tag-repo";

export const tagRouter = express.Router();

tagRouter.get("/",cookieJwtAuth, async (req, res) => {
  const tags: Tag[] = await getAllTags();
  res.status(200).json(tags);
});

tagRouter.get("/:id", cookieJwtAuth ,async (req, res) => {
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

tagRouter.post("/", cookieJwtAuth,  async (req, res) => {
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

tagRouter.put("/", cookieJwtAuth , async (req, res) => {
  const tagId = Number(req.body.id);
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

tagRouter.delete("/:id", cookieJwtAuth ,async (req, res) => {
  const tagId = Number(req.params.id);
  if (tagId === undefined || tagId === null) {
    res.status(400).json({
      message: "Invalid tag id",
      tagId: tagId,
    });
    return;
  }

  const deletedTag = await deleteTag(tagId);
  res.status(200).json(deletedTag);
  return;
});

function tagValidation(name: any, color: any) {
    if(name === undefined ||
      typeof name !== "string" ||
      name.trim().length === 0){
        return false;
      }

    if(color === undefined ||
      color === null ||
      typeof color !== "string" ||
      color.trim().length === 0){
        return false;
      }
  
  return true;
}
