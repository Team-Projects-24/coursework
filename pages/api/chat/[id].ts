import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  switch (req.method) {
    case "GET":
      return handleGet(id, res);
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// GET /api/chat/:id
async function handleGet(id: number, res: NextApiResponse) {
  try {
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
