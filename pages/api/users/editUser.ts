import type { NextApiRequest, NextApiResponse } from "next";
import {
  sendBadRequestResponse,
  sendErrorResponse,
  sendSuccessResponse,
} from "../responses";
import { PrismaClient } from "@prisma/client";
import { IUser } from "types/User.d";

/**
 * @author Tom Whitticase
 *
 * @description This function is used to edit a user.
 *
 * @input {IUser} user - The user to be edited
 * @input {string} password - The new password of the user
 *
 */

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //get user and password(optional) from request
  const user: IUser = req.body.user;
  const password: string = req.body.password;
  //check if user is provided, if not send bad request response
  if (!user) sendBadRequestResponse(res, "No task provided");

  //hash new password
  const bcrypt = require("bcrypt");
  let hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  //map role to enum
  const mapRole = {
    employee: "EMPLOYEE",
    manager: "MANAGER",
    admin: "ADMIN",
  };

  try {
    //update user on database
    if (!password) {
      //update user without password
      const updatedUser = await prisma.user.update({
        where: {
          userId: user.userId,
        },
        data: {
          name: user.name,
          profileImage: user.profileImage,
          role: mapRole[user.role] as "EMPLOYEE" | "ADMIN" | "MANAGER",
        },
      });
    } else {
      //update user with password
      const updatedUser = await prisma.user.update({
        where: {
          userId: user.userId,
        },
        data: {
          name: user.name,
          password: hashedPassword,
          profileImage: user.profileImage,
          role: mapRole[user.role] as "EMPLOYEE" | "ADMIN" | "MANAGER",
        },
      });
    }
    sendSuccessResponse(res, { messaged: "successfully updated user details" });
  } catch (e) {
    console.log(e);
    sendErrorResponse(res, e);
  } finally {
    await prisma.$disconnect();
  }
}
