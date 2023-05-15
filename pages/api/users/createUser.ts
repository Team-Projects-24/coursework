import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { sendErrorResponse, sendSuccessResponse } from "../responses";
//recieves a new user and adds to db
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("start of create user");
  const { newUser, referral } = req.body;
  if (!newUser || !referral) {
    console.log("invalid inputt");
    console.log(newUser, referral);
    return sendSuccessResponse(res, {
      created: false,
      message: "Invalid input data",
    });
  }
  const { name, email, password } = newUser;
  console.log("new user", newUser);

  if (!name || !email || !password || !referral) {
    console.log("Not creating user, bad data given");
    return sendSuccessResponse(res, {
      created: false,
      message: "Invalid input data",
    });
  }

  const bcrypt = require("bcrypt");
  //const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("trying to do prisma stuff");
  //queries here
  try {
    const checkUser = await prisma.user.findFirst({
      where: {
        userId: email,
      },
    });
    if (checkUser) {
      //user already exists
      console.log("User already exists");
      return sendSuccessResponse(res, {
        created: false,
        message: "User already exists",
      });
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        userId: email,
        password: hashedPassword,
        role: "EMPLOYEE",
      },
    });

    if (user) {
      //user created on database
      console.log("created user A");
      sendSuccessResponse(res, { created: true });
    } else {
      //user not created on database
      console.log("created user B");
      sendSuccessResponse(res, { created: false });
    }
  } catch (e) {
    console.log("did not creat user LL");
    sendErrorResponse(res, e);
  } finally {
    await prisma.$disconnect();
  }
}
