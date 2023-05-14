/* endpoint to get all users from the database */
/* inputs: none */
/* outputs: array of user objects (defined by IUser) */

//UNDER CONSTRUCTION

import type { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../types/User.d";
import { PrismaClient } from "@prisma/client";
import { sendErrorResponse, sendSuccessResponse } from "../responses";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
