import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { sendErrorResponse, sendSuccessResponse } from "pages/api/responses";

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

//GET /api/users/data/[id] all details for user id provided
async function handleGet(id: string, res: NextApiResponse) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        userId: id,
      },
      include: {
        chatrooms: {
          include: {
            members: true,
          },
          orderBy: { updatedAt: "desc" },
        },
      },
    });

    if (!user) {
      //no user with given email found on database
      sendErrorResponse(res, { message: "User not found" });
    } else {
      sendSuccessResponse(res, user);
    }
  } catch (e) {
    //problem with connecting to db
    sendErrorResponse(res, e);
  } finally {
    await prisma.$disconnect();
  }
}
