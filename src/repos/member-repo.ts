import { Member, Tag } from "@prisma/client";
import prisma from "../prisma";
import { checkIfTagExists, getTagById } from "./tag-repo";

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

export async function createMember(name: string, tagIds: number[]): Promise<Member> {
  const tags: Tag[] = await addTagToMember(tagIds);

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
  name: string,
  tagIds: number[],
  description: string
): Promise<Member> {

  let tags = await addTagToMember(tagIds);
  let member = await prisma.member.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      description: description,
      tags: {
        connect: tags,
      },
      
    },
  });
  return member;
}

export async function deleteMember(id: number): Promise<Member> {
  let member = await prisma.member.delete({
    where: {
      id: id,
    },
  });

  return member;
}

async function addTagToMember(tagIds: number[]): Promise<Tag[]> {
  let result: Tag[] = [];
  for (const tagId of tagIds) {
    {
      if (!checkIfTagExists(tagId)) {
        return null;
      } else {
        result.push(await getTagById(tagId));
      }
    }
    return result;
  }
}
