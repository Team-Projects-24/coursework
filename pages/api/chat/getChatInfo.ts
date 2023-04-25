import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
import { IUser } from "types/User.d";
import { IChatroomInfo } from "types/Chatroom.d";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
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
        sentInvite: {
          include: {
            user: { select: { userId: true, name: true, profileImage: true } },
          },
        },
      },
    });

    if (chat) {
      const users: IUser[] = chat.members.map((user: User) => ({
        userId: user.userId,
        name: user.name,
        profileImage: user.profileImage as string,
        role: user.role,
      }));

      const chatData: IChatroomInfo = {
        id: chat.id,
        name: chat.name,
        description: chat.description,
        private: chat.private,
        creatorId: chat.creatorId,
        members: users,
        chatImage: chat.chatImage as string,
      };

      res.status(200).json(chatData);
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
