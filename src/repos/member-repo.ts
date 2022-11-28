import { Member, Tag } from "@prisma/client";
import { json } from "stream/consumers";
import prisma from "../prisma";
import { checkIfTagExists, getTagById } from "./tag-repo";

export async function getAllMembers(): Promise<Member[]> {
  let members = await prisma.member.findMany({
    include: {
      tags: true,
    },
  });

  return members;
}

export async function getMemberById(id: number): Promise<Member> {
  let member = await prisma.member.findFirst({
    where: {
      id: id,
    },
    include: {
      tags: true,
    },
  });

  return member;
}

export async function createMember(
  name: string,
  description: string,
  tagIds: number[],
  image: string
): Promise<Member> {
  for (const tagId of tagIds) {
    if (!(await checkIfTagExists(tagId))) {
      throw new Error(tagId + " does not exist");
    }
  }

  let member = await prisma.member.create({
    data: {
      name: name,
      description: description,
      tags: {
        connect: tagIds.map((tagId) => {
          return {
            id: tagId,
          };
        }),
      },
      image: image,
    },
    include: {
      tags: true,
    },
  });

  return member;
}

export async function editMember(
  id: number,
  name: string,
  description: string,
  tagIds: number[],
  image: string
): Promise<Member> {
  for (const tagId of tagIds) {
    if (!(await checkIfTagExists(tagId))) {
      return null;
    }
  }

  let member = await prisma.member.update({
    where: {
      id: id,
    },

    data: {
      name: name,
      description: description,
      tags: {
        connect: tagIds.map((tagId) => {
          return {
            id: tagId,
          };
        }),
      },
      image: image,
    },
    include: {
      tags: true,
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
  console.log(tagIds);

  let result: Tag[] = [];
  for (let i = 0; i < tagIds.length; i++) {
    {
      if (!checkIfTagExists(tagIds[i])) {
        return null;
      } else {
        result.push(await getTagById(tagIds[i]));
      }
      console.log(tagIds[i]);
    }

    console.log(result);

    return result;
  }
}
