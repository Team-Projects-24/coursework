/* endpoint to get all users from the database */
/* inputs: none */
/* outputs: array of user objects (defined by IUser) */

//UNDER CONSTRUCTION

import type { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../types/User.d";
import { PrismaClient } from "@prisma/client";
import { sendErrorResponse, sendSuccessResponse } from "../responses";
import Users from "pages/users";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await prisma.user.findMany({});
    if (user) {
      const usersArray: IUser[] = user.map((user) => {
        const newUser: IUser = {
          userId: user.userId,
          name: user.name,
          role: user.role.toLowerCase() as "employee" | "manager" | "admin",
          profileImage: user.profileImage as string,
        };
        return newUser;
      });
      sendSuccessResponse(res, usersArray);
    }
  } catch (e) {
    sendErrorResponse(res, e);
  } finally {
    await prisma.$disconnect();
  }
}
