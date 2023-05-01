import { NextApiRequest, NextApiResponse } from "next";
import { Message, User } from "@prisma/client";
import { IUser } from "types/User.d";
import { IError } from "types/Error.d";
import prisma from "lib/prisma";
import { ICreateChatMessage } from "types/ChatMessage.d";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const message: ICreateChatMessage = req.body;
  switch (req.method) {
    case "POST":
      return handlePost(message, res);
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handlePost(message: ICreateChatMessage, res: NextApiResponse) {
  try {
    const errors: string[] = [];
    if (!message) {
      errors.push("Required fields are missing in the request.");
    }
    if (errors.length > 0) {
      console.log(errors);
      return res.status(400).json({
        message: "Invalid request error",
        errors: errors,
      });
    }
    const newMessage = await prisma.message.create({
      data: message,
    });
    if (newMessage) {
      res.status(200).json(newMessage);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
