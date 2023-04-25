import { NextApiRequest, NextApiResponse } from "next";
import { Message, User } from "@prisma/client";
import { IUser } from "types/User.d";
import { IError } from "types/Error.d";
import prisma from "lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  switch (req.method) {
    case "GET":
      return handleGet(id, res);
    case "POST":
      return handlePost(id, res);
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(id: number, res: NextApiResponse) {
  try {
    const errors: string[] = [];
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
      //   const chatMessages = messages.map((message) => ({
      //     id: message.id,
      //     senderId: message.senderId,
      //     sender: message.sender,
      //     chatroomId: message.chatroomId,
      //     content: message.content,
      //     createdAt: message.sentAt,
      //     updatedAt: message.updatedAt,
      //   }));
      res.status(200).json(messages);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}

async function handlePost(message: Message, res: NextApiResponse) {}
