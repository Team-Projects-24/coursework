import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import prisma from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.body;

    if (!id) {
      res
        .status(400)
        .json({ message: "Required fields are missing in the request." });
      return;
    }

    const chat = await prisma.chatroom.findFirst({
      where: {
        id: id,
      },
      include: {
        members: true,
        messages: true,
      },
    });

    if (chat) {
      res.status(200).json(chat);
    } else {
      res.status(404).json({ message: "Chat not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting chat" });
  } finally {
    await prisma.$disconnect();
  }
}