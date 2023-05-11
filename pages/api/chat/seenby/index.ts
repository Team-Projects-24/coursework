import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { IEditChat } from "types/Chatroom.d";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { messageId, userId} = req.body;

  switch (req.method) {
    case "POST":
      return handlePut(messageId, userId, res);
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// POST /api/chat/seenBy/:id
async function handlePut(messageId: number, userId: string, res: NextApiResponse) {
  try {
    if (!messageId || !userId) {
      res
        .status(400)
        .json({ message: "Required fields are missing in the request." });
      return;
    }

    await prisma.seenBy.upsert({
      create: {
        userId,
        messageId,
      },
      where: {
        messageId_userId: {
          messageId,
          userId,
        }
      },
      update: {},
    })

    res.status(200).json({ message: "seenBy created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating seenBy." });
  } finally {
    await prisma.$disconnect();
  }
}
