import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import prisma from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { creatorId, participantId } = req.body;

    const chat = await prisma.chatroom.create({
      data: {
        private: true,
        members: {
          connect: [{ userId: creatorId }, { userId: participantId }],
        },
        creatorId: creatorId,
        description: "A chat between users.",
        name: `${creatorId}-${participantId}`,
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
