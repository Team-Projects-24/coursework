/* endpoint for getting user info */
/* inputs: request.body contains username (email address of user) */
/* outputs: user object (defined by IUser) */

//IN REVIEW - NEEDS TESTING AND REFACTORING

import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "types/User.d";
import { sendErrorResponse, sendSuccessResponse } from "../responses";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username } = req.body;
    const dbUser = await prisma.user.findFirst({
      where: {
        userId: username,
      },
    });

    if (!dbUser) {
      //no user with given email found on database
      sendErrorResponse(res, { message: "User not found" });
    } else {
      const user: IUser = {
        userId: dbUser.userId,
        name: dbUser.name as string,
        profileImage: dbUser.profileImage as string, //change later when img added to db
        role: dbUser.role.toLowerCase() as "employee" | "manager" | "admin",
      };
      sendSuccessResponse(res, { user });
    }
  } catch (e) {
    //problem with connecting to db
    sendErrorResponse(res, e);
  } finally {
    await prisma.$disconnect();
  }
}
