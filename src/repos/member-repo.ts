import { Member} from "@prisma/client";
import prisma from "../prisma";

export async function getAllMembers(): Promise<Member[]> {
    let members = await prisma.member.findMany();

    return members;
}

export async function getMemberById(id: number): Promise<Member> {
    let member = await prisma.member.findUnique({
        where:{
            id: id
        }
    });

    return member;
};
