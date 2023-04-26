import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { sendSuccessResponse, sendErrorResponse } from "pages/api/responses";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return handleGet(res);
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

//GET /api/users/data:  all details for all users
async function handleGet(res: NextApiResponse) {
  try {
    const users = await prisma.user.findMany({
      include: {
        chatrooms: {
          include: {
            members: true,
          },
        },
      },
    });
    if (users) {
      sendSuccessResponse(res, users);
    }
  } catch (e) {
    sendErrorResponse(res, e);
  } finally {
    await prisma.$disconnect();
  }
}
