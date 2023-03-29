import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ message: "Required fields are missing in the request." });
    }
    const message = await prisma.message.findFirst({
      where: {
        id,
      },
      include: {
        seenBy: true,
      },
    });
    if (message) {
      res.status(200).json(message);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
