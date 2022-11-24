import { Member, Tag } from "@prisma/client";
import prisma from "../prisma";

export async function getAllMembers(): Promise<Member[]> {
  let members = await prisma.member.findMany();

  return members;
}

export async function getMemberById(id: number): Promise<Member> {
  let member = await prisma.member.findUnique({
    where: {
      id: id,
    },
  });

  return member;
}

export async function createMember(name: any, tags: any): Promise<Member> {
  //TODO: validation for member
  let member = await prisma.member.create({
    data: {
      name: name,
      tags: {
        connect: tags,
      },
    },
  });

  return member;
}

export async function editMember(
  id: number,
  name: any,
  tags: any
): Promise<Member> {
  //TODO: validation for member
  let member = await prisma.member.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      tags: {
        connect: tags,
      },
    },
  });
  return member;
}

export async function deleteMember(id: number): Promise<Member> {
  //TODO: validation for member
  let member = await prisma.member.delete({
    where: {
      id: id,
    },
  });

  return member;
}
