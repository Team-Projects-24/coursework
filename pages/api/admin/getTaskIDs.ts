// api for getting all the task IDs

import { NextApiRequest, NextApiResponse } from "next";
import { ITask } from "types/Task.d";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const results = await prisma.task.findMany();

    if (results) {
      let tasks: ITask[] = [];

      results.forEach((result) => {
        let task: ITask = {
          taskId: result.taskId,
          name: result.name,
          manHoursSet: result.manHoursSet,
        };
        tasks.push(task);
      });

      res.status(200).json(tasks);
    } else {
      res.status(404).json({ message: "Tasks not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting tasks" });
  } finally {
    await prisma.$disconnect();
  }
}
