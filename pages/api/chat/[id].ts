import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { IEditChat } from "types/Chatroom.d"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = parseInt(req.query.id as string);
  switch (req.method) {
    case "GET":
      return handleGet(id, res);
    case "PUT":
      return handlePut(id, req.body, res);
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

// PUT /api/chat/:id
async function handlePut(
  id: number,
  editedChat: IEditChat,
  res: NextApiResponse
) {
  try {
    if (!id) {
      res
        .status(400)
        .json({ message: "Required fields are missing in the request." });
      return;
    }
    const chat = await prisma.chatroom.update({
      where: {
        id: id,
      },
      data: {
        name: editedChat.name,
        description: editedChat.description,
        chatImage: editedChat.chatImage,
        members: {
          set: editedChat.members.map((memberId) => ({ userId: memberId })),
        },
      },
      include: {
        members: true,
        messages: true,
      },
    });
    if (chat){
      res.status(200).json(chat);
    }else{
      res.status(404).json({ message: "Chat not found"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating chat"});
  } finally {
    await prisma.$disconnect();
  }
}

