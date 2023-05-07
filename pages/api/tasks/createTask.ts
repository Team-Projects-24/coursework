//api for creating task

import { NextApiRequest, NextApiResponse } from "next";
import { Chatroom, User } from "@prisma/client";
// import { ICreateChatroom } from "types/Chatroom.d";
import { ICreateTask } from "types/Task.d";
import prisma from "lib/prisma";
import { ICreateChatroom } from "types/Chatroom.d";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { room } = req.body;

  switch (req.method) {
    case "POST":
      return handlePost(room, res);
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// POST /api/chat
async function handlePost(room: ICreateChatroom, res: NextApiResponse) {
  try {
    const chat = await prisma.chatroom.create({
      data: {
        name: room.name,
        creatorId: room.creatorId,
        description: "",
        private: room.private,
        chatImage: room.chatImage,
        members: {
          connect: [
            { userId: room.creatorId },
            ...room.members.map((memberId) => ({ userId: memberId })),
          ],
        },
      },
    });
    if (chat) {
      res.status(200).json(chat);
    } else {
      res.status(404).json({ message: "Chat not created" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error making chat" });
  } finally {
    await prisma.$disconnect();
  }
}
