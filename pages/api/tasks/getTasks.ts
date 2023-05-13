import type { NextApiRequest, NextApiResponse } from "next";
import { ITask } from "../../../types/Task.d";
import { IUser } from "../../../types/User.d";
import {
  sendBadRequestResponse,
  sendErrorResponse,
  sendSuccessResponse,
} from "../responses";
import { PrismaClient, Project, Task, User } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @author Tom Whitticase and Ben Pritchard
 *
 * @description Gets all tasks from the database.
 *
 * @input {string} id - user id of the user to get tasks for
 * @input {boolean} all - whether to get all tasks or just the user's tasks
 */

//dictionary to map database enums to ITask status strings
const statusMap = {
  TODO: "to-do",
  INPROGRESS: "in-progress",
  REVIEW: "review",
  COMPLETED: "completed",
};

//map database user to IUser
const mapAssignee = (assignee: User): IUser => ({
  userId: assignee.userId,
  name: assignee.name,
  role: assignee.role.toLowerCase() as "employee" | "manager" | "admin",
  profileImage: assignee.profileImage as string,
});

//map database task to ITask
const mapTask = (
  task: Task & {
    assignee: User;
    project: Project | null;
  }
): ITask => ({
  id: task.id,
  name: task.name,
  description: task.description,
  deadline: task.deadline,
  user: mapAssignee(task.assignee),
  status: statusMap[task.status] as
    | "to-do"
    | "in-progress"
    | "review"
    | "completed",
  projectName: task.project ? task.project.name : null,
  archived: task.archived,
  manHours: task.manHours,
  subTasks: JSON.parse(JSON.stringify(task.subTasks as string)),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.body.id;
  if (!id) return sendBadRequestResponse(res, { message: "No id provided" });
  const all: boolean = req.body.all;
  const belongingToMyProjects: boolean = req.body.belongingToMyProjects;

  try {
    //if all is true then get all tasks, otherwise get only the user's tasks
    const tasks = await prisma.task.findMany({
      where: all ? {} : { assigneeId: id },
      include: {
        assignee: true,
        project: true,
      },
    });

    //if belongingToMyProjects is true then filter out tasks that don't belong to the user's projects
    if (belongingToMyProjects) {
      const projects = await prisma.project.findMany({
        where: { leaderId: id },
        include: {
          tasks: {
            include: {
              assignee: true,
              project: true,
            },
          },
        },
      });

      //loop through all projects and add their tasks to the tasks array if not already present
      for (const project of projects) {
        for (const task of project.tasks) {
          if (!tasks.find((t) => t.id === task.id)) tasks.push(task);
        }
      }
    }

    sendSuccessResponse(res, tasks.map(mapTask));
  } catch (e) {
    console.error(e);
    sendErrorResponse(res, { message: "Error getting tasks" });
  } finally {
    await prisma.$disconnect();
  }
}
