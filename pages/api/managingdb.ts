import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";

export default async function handler() {
  const bcrypt = require("bcrypt");
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash("Ade", salt);

  async function main() {
    const user = await prisma.user.create({
      data: {
        name: "Ade",
        userId: "Ade",
        password: hash,
        role: "MANAGER",
      },
    });
  }
  main();
}
