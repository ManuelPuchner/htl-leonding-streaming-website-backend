import { Member } from "@prisma/client";
import express from "express";
import {
  getAllMembers,
  getMemberById,
  createMember,
  editMember,
  deleteMember,
} from "../repos/member-repo";
export const taskRouter = express.Router();

// return all tasks
taskRouter.get("/", async function (request, response) {
  const mebers: Member[] = await getAllMembers();
  response.status(200).json(mebers);
});

taskRouter.get("/:id", async function (request, response) {
  const id: number = Number(request.params.id);
  const member: Member | undefined = await getMemberById(id);
  if (member === undefined) {
    response.sendStatus(404);
    return;
  }
  response.status(200).json(member);
});

taskRouter.post("/", async function (request, response) {
  const { name, description, tagsIds, image } = request.body;
  const newMember = await createMember(name, description, tagsIds, image);
  response.status(200).json(newMember);
});

taskRouter.put("/:id", async function (request, response) {
  
  const id: number = Number(request.params);
  if (id === undefined) {
    response.sendStatus(400);
    return;
  }
  const { name, description, tags, image} = request.body;
  if(typeof name !== "string" || name !== undefined || name.trim().length === 0) {
    response.sendStatus(400);
    return;
  }

  for (const tag of tags) {
    if (typeof tag!== "number" || tag !== undefined) {
      response.sendStatus(400);
      return;
    }
  }

  const member: Member | undefined = await editMember(id, name, description, tags, image);
  if (member === undefined) {
    response.sendStatus(404);
    return;
  }
  response.status(200).json(member);
});

taskRouter.delete("/:id", async function (request, response) {
  const id: number = Number(request.params);
  if (id === undefined) {
    response.sendStatus(400);
    return;
  }
  const deletedmember: Member = await deleteMember(id);
  response.status(200).json(deletedmember);
});  