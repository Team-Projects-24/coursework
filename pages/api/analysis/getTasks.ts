/**
 *
 * @asuthor Euan Hall
 *
 * @description Pull all tasks of the selected user
 *
 */

import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient, Task, Team, User } from "@prisma/client";
import { ITask } from "types/analysis/Task.d";
import prisma from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userID } = req.body;
    // console.log(userID, typeof userID);

    if (!userID) {
      res
        .status(400)
        .json({ message: "Required fields are missing in the request." });
      return;
    }

    //console.log(query)
    // const tasks = await prisma.$queryRaw(
    //   Prisma.sql`select deadline as "deadline", name as "taskName", manHoursCompleted as "completed", manHoursSet as "set" from Task where userId =${userID};`
    // );
    //const results = await prisma.$queryRaw<ITask[]>`select userId as "id", sum(manHoursSet) as "manHoursSet", sum(manHoursCompleted) as "manHoursCompleted" from Task group by id having id in (${Prisma.join(userID)});`

    const tasks: Task[] = await prisma.task.findMany({
      where: {
        userId: userID,
      },
    });

    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting user" });
  } finally {
    await prisma.$disconnect();
  }
}
