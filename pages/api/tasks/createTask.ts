import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { ICreateTask } from "types/Task.d";
import {
  sendErrorResponse,
  sendSuccessResponse,
  sendBadRequestResponse,
} from "../responses";

const prisma = new PrismaClient();

/**
 * @author Tom Whitticase and Ben Pritchard
 *
 * @description Adds a new task to the database.
 *
 * @input {INewTask} newTask - data for the new task
 *
 * @output {status: 200, message: "Task created successfully"} on success
 * @output {status: 400, message: "Missing required fields"} if required fields are missing
 * @output {status: 500, message: "Error creating task"} if there was an error creating the task
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Destructure the expected properties from the request body
  const task: ICreateTask = req.body.task;
  // Check if any of the required properties are missing
  if (!task) {
    // If any of the required properties are missing, return a 400 Bad Request response
    return sendBadRequestResponse(res, { message: "Missing required fields" });
  }

  try {
    // Create a new task in the database
    const mapStatus = {
      completed: "COMPLETED",
      "in-progress": "INPROGRESS",
      review: "REVIEW",
      "to-do": "TODO",
    };
    const addedTask = await prisma.task.create({
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
        assigneeId: task.userId,
        projectId: task.projectId,
      },
    });

    // If the task was created successfully, return a 200 Success response
    return sendSuccessResponse(res, {
      message: "Task created successfully",
    });
  } catch (error) {
    // If there was an error creating the task, return a 500 Internal Server Error response
    return sendErrorResponse(res, { message: "Error creating task" });
  } finally {
    // Disconnect from the database, regardless of whether there was an error or not
    await prisma.$disconnect();
  }
};
