//recieves a task that already exists but with new values and updates the database

import type { NextApiRequest, NextApiResponse } from "next";
import { ITask } from "../../../types/Task.d";
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
 * @description Edits a task on the database.
 *
 * @input {ITask} task - the task with new values to be updated on the database
 *
 * @output {status: 200, message: "Task edited successfully"} on success
 * @output {status: 400, message: "Missing required fields"} if required fields are missing
 * @output {status: 500, message: "Error updating task"} if there was an error updating the task
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //check that given data is valid
  try {
    const task: ITask = req.body.task;
  } catch {
    return sendBadRequestResponse(res, "No task provided");
  }
  const task: ITask = req.body.task; //task to edit
  if (!task) sendBadRequestResponse(res, "No task provided");

  //dictionary to map status strings to database values
  const mapStatus = {
    completed: "COMPLETED",
    "in-progress": "INPROGRESS",
    review: "REVIEW",
    "to-do": "TODO",
  };

  //if task is valid then update the database with the new task
  try {
    const updated = await prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        name: task.name,
        description: task.description,
        status: mapStatus[task.status] as
          | "COMPLETED"
          | "INPROGRESS"
          | "TODO"
          | "REVIEW",
        deadline: task.deadline,
        manHours: task.manHours,
        subTasks: JSON.parse(JSON.stringify(task.subTasks)),
      },
    });
    sendSuccessResponse(res, null);
  } catch (e) {
    //send error response if there was an error updating the task
    sendErrorResponse(res, e);
  } finally {
    //close the database connection
    await prisma.$disconnect();
  }
}
