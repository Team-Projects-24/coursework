import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  sendBadRequestResponse,
  sendErrorResponse,
  sendSuccessResponse,
  sendUnauthorizedResponse,
} from "../responses";
import bcrypt from "bcrypt";

/**
 * @author Tom Whitticase
 *
 * @description This function is used to authenticate a user's login details.
 *
 * @input {string} username - The username of the user
 * @input {string} password - The password of the user
 *
 */

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;

  if (!username || !password) {
    sendBadRequestResponse(res, { message: "Invalid input data" });
    return;
  }

  async function main() {
    try {
      //remove referral code from database
      const user = await prisma.user.findFirst({
        where: {
          userId: username,
        },
      });

      if (!user) {
        //no user with given email found on database
        sendUnauthorizedResponse(res, { message: "Invalid credentials" });
      } else {
        //user with given email found on database
        if (user.password) {
          //log the hash of the given password
          console.log(
            "hash of given password: ",
            await bcrypt.hash(password, 10)
          );
          //log the hash of the password on database
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            //password match
            sendSuccessResponse(res, "Authenticated");
          } else {
            //password not match
            sendUnauthorizedResponse(res, { message: "Invalid credentials" });
          }
        } else {
          //user has no password, invalid credential data on database

          sendUnauthorizedResponse(res, { message: "Invalid credentials" });
        }
      }
    } catch (e) {
      //problem with connecting to db
      sendErrorResponse(res, e);
    }
  }

  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
