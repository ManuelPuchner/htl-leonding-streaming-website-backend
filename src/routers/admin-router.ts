import { AdminPassword, Member } from "@prisma/client";
import express from "express";
import bcrypt  from "bcrypt"

export const adminRouter = express.Router();

adminRouter.post("/", (req, res) => {{
    const password = req.params;
    if(password === undefined ||typeof password !== "string"){
        return res.status(400).json({
            message: "Valid password is required!"
        });
    }

    

}
});

async function login(userPassword: string) {
    const password: AdminPassword = await prisma.adminPassword.findFirst();
    return await bcrypt.compare( password.password , userPassword);
}