import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const pw = process.argv[2];

async function main() {
    const generatedPw = await prisma.adminPassword.create({
        data: {
            password: await bcrypt.hash(pw, 10),
        },
    })
};

async function logPws() {
    const pws = await prisma.adminPassword.findMany();
    console.log(pws);
}

if(pw)
    main();
else 
    logPws();