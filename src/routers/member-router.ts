import { Member } from "../../generated/client";
import express from "express";
import { cookieJwtAuth } from "../middleware/cookie-jwt-auth";
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
    response.sendStatus(400);
    return;
  }
  response.status(200).json(member);
});

memberRouter.post("/", cookieJwtAuth, async function (request, response) {
  const { name, description, tagIds, image } = request.body;
  if (!validateMember(name, description, tagIds, image)) {
    response.status(400).send("Invalid member");
    return;
  }

  let newMember: Member = null;
  try {
    newMember = await createMember(name, description, tagIds, image);
  } catch (error) {
    response.status(400).send("invalid tag" + error.message);
    return;
  }

  response.status(200).json(newMember);
});

memberRouter.put("/", cookieJwtAuth, async function (request, response) {
  let { id, name, description, tagIds, image } = request.body;
  console.log(id, name, description, tagIds, image);
  if (!validateMember(name, description, tagIds, image) || !validateId(id)) {
    response.status(405).send("Invalid member");
    return;
  }

  id = parseInt(id);
  let newMember: Member = null;
  try {
    newMember = await editMember(id, name, description, tagIds, image);
  } catch (error) {
    response.status(405).send("invalid tag" + error.message);
  }

  response.status(200).json(newMember);
});

memberRouter.delete("/:id", cookieJwtAuth, async function (request, response) {
  if (!validateId(request.params.id)) {
    response.status(405).send("Invalid id");
    return;
  }

  let id: number = parseInt(request.params.id);
  const deletedmember: Member = await deleteMember(id);
  response.status(200).json(deletedmember);
});

function validateMember(
  name: any,
  description: any,
  tags: any,
  image: any
): boolean {
  if (
    name === null ||
    typeof name !== "string" ||
    name === undefined ||
    name.trim().length === 0
  ) {
    console.log("invalid member name");

    return false;
  }

  if (
    description === null ||
    description === undefined ||
    description.trim().length === 0 ||
    typeof description !== "string"
  ) {
    console.log("invalid member description");

    return false;
  }

  if (
    image === null ||
    image === undefined ||
    image.trim().length === 0 ||
    typeof image !== "string"
  ) {
    console.log("invalid member image");

    return false;
  }

  if (tags === null || tags === undefined) {
    console.log("tags is undefined");

    return false;
  }
  for (const tag of tags) {
    if (tag === null || typeof tag !== "number" || tag === undefined) {
      console.log("is NaN", tag);
      return;
    }
  }
  return true;
}

function validateId(id: any): boolean {
  if (id === undefined || id === null) {
    console.log("id is invalid");

    return false;
  }
  if (isNaN(Number(id))) {
    console.log("id is NaN");

    return false;
  }
  return true;
}
