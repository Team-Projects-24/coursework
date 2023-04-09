import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const errors: string[] = [];
    const { id, content, userId } = req.body;
    if (!id || !content || !userId) {
      errors.push("Required fields are missing in the request.");

      console.log(id, content, userId);
    }
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Invalid request error",
        errors: errors,
      });
    }
    const message = await prisma.message.create({
      data: {
        chatroomId: id,
        senderId: userId,
        content: content,
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
