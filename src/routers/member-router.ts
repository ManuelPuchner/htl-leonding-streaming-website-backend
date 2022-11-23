//TODO: make a meber router

import { Member } from "@prisma/client";
import express from "express";
import { StatusCodes } from "http-status-codes";

export const taskRouter = express.Router();

// return all tasks
taskRouter.get("/", function (request, response) {
    const mebers: Member[] getAllMembers();
    response.status(StatusCodes.OK).json(mebers);
});

taskRouter.get("/:id", function (request, response) {
    const id: number = Number(request.params.id);
    const member : Member| undefined = getTaskById(id);
    if (member === undefined) {
        response.sendStatus(StatusCodes.NOT_FOUND);
        return;
    }
    response.status(StatusCodes.OK).json(member);
});