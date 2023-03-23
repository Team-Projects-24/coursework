//recieves a task id and removes task from db
import type { NextApiRequest, NextApiResponse } from "next";
import {
  sendBadRequestResponse,
  sendErrorResponse,
  sendSuccessResponse,
} from "../responses";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @author Tom Whitticase and Ben Pritchard
 *
 * @description Removed a task from the database.
 *
 * @input {number} id - id of task to delete
 *
 * @output {status: 200, message: "Task deleted successfully"} on success
 * @output {status: 400, message: "Missing required fields"} if required fields are missing
 * @output {status: 500, message: "Error deleting task"} if there was an error deleting the task
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: number = req.body.id;
  if (!id) {
    return sendBadRequestResponse(res, { message: "Missing required fields" });
  }

  try {
    //delete task from db
    const taskList = await prisma.task.delete({
      where: {
        id: id,
      },
    });

    sendSuccessResponse(res, { message: "Successfulyl deleted task" });
  } catch (e) {
    sendErrorResponse(res, e);
  } finally {
    await prisma.$disconnect();
  }
}
