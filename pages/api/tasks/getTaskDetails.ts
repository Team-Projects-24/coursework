/*
Req: Takes in task id
Res: Sends back all data for that task
*/
import type { NextApiRequest, NextApiResponse } from "next";
import { ITask } from "../../../types/Task.d";
import { IUser } from "../../../types/User.d";
import {
  sendBadRequestResponse,
  sendErrorResponse,
  sendSuccessResponse,
} from "../responses";
import { PrismaClient } from "@prisma/client";
import Tasks from "pages/tasks";
import { ISubTask } from "types/SubTask.d";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { taskId } = req.body;

  async function main() {
    try {
      const task = await prisma.task.findFirst({
        where: { id: taskId },
        include: {
          subTasks: true,
          assignee: true,
        },
      });
      if (task) {
        const assignee: IUser = {
          userId: task.assignee.userId,
          name: task.assignee.name,
          role: task.assignee.role.toLowerCase() as
            | "employee"
            | "manager"
            | "admin",
          profileImage: task.assignee.profileImage as string,
        };

        const convSubTasks: ISubTask[] = task.subTasks.map((subTask) => {
          const newSubTask: ISubTask = {
            id: subTask.id,
            name: subTask.name,
            completed: subTask.completed,
          };
          return newSubTask;
        });

        const statusMap = {
          TODO: "to-do",
          INPROGRESS: "in-progress",
          REVIEW: "review",
          COMPLETED: "completed",
        };

        const resTask: ITask = {
          id: task.id,
          name: task.name,
          description: task.description,
          deadline: task.deadline,
          user: assignee,
          status: statusMap[task.status] as
            | "to-do"
            | "in-progress"
            | "review"
            | "completed",
          projectId: task.projectId,
          archived: task.archived,
          manHours: task.manHours,
          subTasks: convSubTasks,
        };
        sendSuccessResponse(res, resTask);
      }
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
