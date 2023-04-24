import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
import { IUser } from "types/User.d";
import { IError } from "types/Error.d";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  try {
    const errors: string[] = [];
    const { id } = req.body;
    if (!id) {
      errors.push("Required fields are missing in the request.");
    }
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Invalid request error",
        errors: errors,
      });
    }
    const messages = await prisma.message.findMany({
      where: {
        chatroomId: id,
      },
      include: {
        sender: {
          select: {
            userId: true,
            name: true,
            profileImage: true,
          },
        },
      },
    });
    if (messages) {
      const chatMessages = messages.map((message) => ({
        id: message.id,
        senderId: message.senderId,
        sender: message.sender,
        chatroomId: message.chatroomId,
        content: message.content,
        createdAt: message.sentAt,
        updatedAt: message.updatedAt,
      }));
      res.status(200).json(chatMessages);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
