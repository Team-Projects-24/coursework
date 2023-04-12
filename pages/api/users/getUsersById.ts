/* endpoint to get all users with an id matching a substring from the database */
/* inputs: partial Id to match */
/* outputs: array of user objects (defined by IUser) */

//UNDER CONSTRUCTION

import type { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../types/User.d";
import { PrismaClient } from "@prisma/client";
import { sendErrorResponse, sendSuccessResponse } from "../responses";
import { sortBy } from "lodash";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { partialId } = req.body;
    const users = await prisma.user.findMany({
      where: {
        userId: {
            startsWith: partialId,
        }
      },
      include: {
        chatrooms: true,
      },
      orderBy: [
        { name: "asc" },
        { userId: "asc"}
      ]
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
