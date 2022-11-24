import { Tag } from "@prisma/client";
import prisma from "../prisma";

export async function checkIfTagExists(id: number): Promise<boolean> {
    return!!prisma.tag.findFirst({
      where: {
        id: id,
      },
    });
  }
  
  export async function getTagById(id: number): Promise<Tag> {
    const tag: Promise<Tag> = prisma.tag.findFirst({
      where: {
        id: id,
      },
    });
  
    return tag;
  }