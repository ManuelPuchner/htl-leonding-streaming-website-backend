import { Member } from "@prisma/client";
import express from "express";
import {
  getAllMembers,
  getMemberById,
  createMember,
  editMember,
  deleteMember,
} from "../repos/member-repo";
export const memberRouter = express.Router();

// return all tasks
memberRouter.get("/", async function (request, response) {
  const mebers: Member[] = await getAllMembers();
  response.status(200).json(mebers);
});

memberRouter.get("/:id", async function (request, response) {
  const id: number = Number(request.params.id);
  const member: Member | undefined = await getMemberById(id);
  if (member === undefined) {
    response.sendStatus(404);
    return;
  }
  response.status(200).json(member);
});

memberRouter.post("/", async function (request, response) {
  const { name, description, tagsIds, image } = request.body;
  console.log(name, description, tagsIds, image);
  if (
    typeof name !== "string" ||
    name === undefined ||
    (name.trim().length === 0 && description === undefined) ||
    description.trim().length === 0
  ) {
    response.sendStatus(400);
    return;
  }
  if(tagsIds === undefined){
    response.sendStatus(400);
    return;
  }

  for (const tag of tagsIds) {
    if (typeof tag !== "number" || tag === undefined) {
      console.log("is NaN", tag);
      response.sendStatus(400);
      return;
    }
  }

  let newMember: Member = null
  try {
    newMember = await createMember(name, description, tagsIds, image);
  } catch (error) {
    response.status(405).send("invalid tag" + error.message);
  }
  
  response.status(200).json(newMember);
});

memberRouter.put("/:id", async function (request, response) {
  const id: number = Number(request.params);
  if (id === undefined) {
    response.sendStatus(400);
    return;
  }
  const { name, description, tags, image } = request.body;
  if (
    typeof name !== "string" ||
    name === undefined ||
    (name.trim().length === 0 && description === undefined) ||
    description.trim().length === 0
  ) {
    response.sendStatus(400);
    return;
  }

  for (const tag of tags) {
    if (typeof tag !== "number" || tag !== undefined) {
      response.sendStatus(400);
      return;
    }
  }

  const member: Member | undefined = await editMember(
    id,
    name,
    description,
    tags,
    image
  );
  if (member === undefined) {
    response.sendStatus(404);
    return;
  }
  response.status(200).json(member);
});

memberRouter.delete("/:id", async function (request, response) {
  const id: number = Number(request.params);
  if (id === undefined) {
    response.sendStatus(400);
    return;
  }
  const deletedmember: Member = await deleteMember(id);
  response.status(200).json(deletedmember);
});
