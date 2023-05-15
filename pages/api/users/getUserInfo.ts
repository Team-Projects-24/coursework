/* endpoint for getting user info */
/* inputs: request.body contains username (email address of user) */
/* outputs: user object (defined by IUser) */

//IN REVIEW - NEEDS TESTING AND REFACTORING

import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { sendErrorResponse, sendSuccessResponse } from "../responses";
import { orderBy } from "lodash";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        userId: username,
      },
      include: {
        chatrooms: {
          include: {
            members: true,
          },
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
