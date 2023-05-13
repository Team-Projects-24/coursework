import type { NextApiRequest, NextApiResponse } from "next";
import { ITask } from "../../../types/Task.d";
import { IUser } from "../../../types/User.d";
import { sendSuccessResponse } from "../responses";
import { PrismaClient, Project, SubTask, Task, User } from "@prisma/client";
import { ISubTask } from "types/SubTask.d";

const prisma = new PrismaClient();

const statusMap = {
  TODO: "to-do",
  INPROGRESS: "in-progress",
  REVIEW: "review",
  COMPLETED: "completed",
};

const mapAssignee = (assignee: User): IUser => ({
  userId: assignee.userId,
  name: assignee.name,
  role: assignee.role.toLowerCase() as "employee" | "manager" | "admin",
  profileImage: assignee.profileImage as string,
});

const mapSubTask = (subTask: any): ISubTask => ({
  id: subTask.id,
  name: subTask.name,
  completed: subTask.completed,
});

const mapTask = (
  task: Task & {
    subTasks: SubTask[];
    assignee: User;
    project: Project;
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
  projectName: task.project.name,
  archived: task.archived,
  manHours: task.manHours,
  subTasks: task.subTasks.map(mapSubTask),
});

const disconnect = async () => {
  await prisma.$disconnect();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.body;

  try {
    const tasks = await prisma.task.findMany({
      where: { assigneeId: userId },
      include: {
        subTasks: true,
        assignee: true,
        project: true,
      },
    });

    sendSuccessResponse(res, tasks.map(mapTask));
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "An error occurred" });
  } finally {
    disconnect();
  }
}
