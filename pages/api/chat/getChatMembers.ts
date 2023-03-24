import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
// import { IChat } from "types/Chat.d";
import { IUser } from "types/User.d";
import { IChatroom, IChatroomInfo } from "types/Chatroom.d";
import { includes } from "lodash";

const prisma = new PrismaClient();

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

    const mems = await prisma.chatroom.findFirst({
      where: {
        id: id,
      },
      include: {
        members: true,
      },
    });

    if (mems) {
      const users: IUser[] = mems.members.map((user: User) => ({
        userId: user.userId,
        name: user.name,
        profileImage: user.profileImage as string,
        role: user.role,
      }));
      res.status(200).json(users);
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
