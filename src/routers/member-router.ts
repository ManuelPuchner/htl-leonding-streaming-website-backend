//TODO: make a meber router

import { Member } from "@prisma/client";
import express from "express";
import { StatusCodes } from "http-status-codes";
import { getAllMembers, getMemberById, createMember, editMember} from "../repos/member-repo";

export const taskRouter = express.Router();

// return all tasks
taskRouter.get("/", async function (request, response) {
    const mebers: Member[] = await getAllMembers();
    response.status(StatusCodes.OK).json(mebers);
});

taskRouter.get("/:id", async function (request, response) {
    const id: number = Number(request.params.id);
    const member : Member | undefined = await getMemberById(id);
    if (member === undefined) {
        response.sendStatus(StatusCodes.NOT_FOUND);
        return;
    }
    response.status(StatusCodes.OK).json(member);
});