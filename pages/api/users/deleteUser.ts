/* delete user from database */
/* inputs: request.body contains username (email address of user) */
/* outputs: none */
import type { NextApiRequest, NextApiResponse } from "next";
import { ITask } from "../../../types/Task.d";
import {
  sendBadRequestResponse,
  sendErrorResponse,
  sendSuccessResponse,
} from "../responses";
import { PrismaClient } from "@prisma/client";
import Tasks from "pages/tasks";
import Task from "components/tasks/Task";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  const { username } = req.body; //task
  if (!username) sendBadRequestResponse(res, "No user provided");

  //get tasks from database that the user has access to (if manager then all, if employee then only their tasks)
  async function main() {
    try {
      const user = await prisma.user.delete({
        where: {
          userId: username,
          },
      });

      sendSuccessResponse(res, { deleted: true });
    } catch (e) {
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