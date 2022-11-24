import { Tag } from "@prisma/client";
import prisma from "../prisma";
import { Member } from "@prisma/client";

export async function getAllTags(): Promise<Tag[]> {
  const tags = await prisma.tag.findMany();
  return tags;
}

export async function getTagById(id: number): Promise<Tag> {
  const tag: Promise<Tag> = prisma.tag.findFirst({
    where: {
      id: id,
    },
    include: {
          members: true,
    }
  });

  return tag;
}

export async function postTag(name: string, color: string): Promise<Tag> {
  const tag: Promise<Tag> = prisma.tag.create({
    data: {
      name: name,
      color: color,
    },
  });

  return tag;
}

//Todo: editMember

export async function deleteTag(id: number): Promise<Tag> {
  const tag: Promise<Tag> = prisma.tag.delete({
    where: {
      id: id,
    },
  });
  return tag;
}

export async function checkIfTagExists(id: number): Promise<boolean> {
  return !!prisma.tag.findFirst({
    where: {
      id: id,
    },
  });
}