import { Member } from "@prisma/client";
import express from "express";
import { getAllMembers, getMemberById, createMember, editMember, deleteMember} from "../repos/member-repo";
export const taskRouter = express.Router();

// return all tasks
taskRouter.get("/", async function (request, response) {
    const mebers: Member[] = await getAllMembers();
    response.status(200).json(mebers);
});

taskRouter.get("/:id", async function (request, response) {
    const id: number = Number(request.params.id);
    const member : Member | undefined = await getMemberById(id);
    if (member === undefined) {
        response.sendStatus(404);
        return;
    }
    response.status(200).json(member);
});

taskRouter.post("/", async function (request, response) {
    const { name, tags } = request.body;
    const newMember = await createMember(name, tags);
    response.status(200).json(newMember);
});

taskRouter.put("/:id", async function (request, response) {
    const id: number = Number(request.params);
    if( id === undefined){
        response.sendStatus(400);
        return;
    }
    const { name, tags } = request.body;
    const editedMember = await editMember( id, name, tags);
    response.status(200).json(editedMember);
});

taskRouter.delete("/:id", async function (request, response) {
    const id: number = Number(request.params);
    if( id === undefined){
        response.sendStatus(400);
        return;
    }
    const deletedmember : Member = await deleteMember(id);
    response.status(200).json(deletedmember);
});