import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(){
    const bcrypt = require("bcrypt");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("Test", salt);


    async function main() {
        const user = await prisma.user.create({
            data: {
                name: "test",
                userId: "test@test.com",
                password: hash,
                role: "MANAGER"
            }
        });
    }
}