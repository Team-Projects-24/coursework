import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async function handler(
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

// GET /api/chat/message/:id
async function handleGet(id: number, res: NextApiResponse) {
  try {
    if (!id) {
      res
        .status(400)
        .json({ message: "Required fields are missing in the request." });
    }
    const message = await prisma.message.findFirst({
      where: {
        id,
      },
      include: {
        seenBy: true,
      },
    });
    if (message) {
      res.status(200).json(message);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
