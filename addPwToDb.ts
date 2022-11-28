import { PrismaClient } from "@prisma/client";
import { PollingWatchKind } from "typescript";

const prisma = new PrismaClient();

const pw = process.argv[2];

async function main() {
    const generatedPw = await prisma.adminPassword.create({
        data: {
            password: pw,
        },
    })};