/**
 * 
 * @asuthor Olivia Gray
 * 
 * @description Pull all performance metrics of the selected users
 * 
 */


import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Team, User } from "@prisma/client";
import { IPerformance } from "types/analysis/Performance.d";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userIDs } = req.body;

    if (!userIDs) {
      res
        .status(400)
        .json({ message: "Required fields are missing in the request." });
      return;
    }

    const results = await prisma.performanceLog.groupBy({
        by: ['userId'],
        _sum: {
            manHoursSet: true,
            manHoursCompleted: true
        },
        where: {
            userId: {in: userIDs}
        }
    })

    //console.log(results);
    if (results) {

      let users: IPerformance[] = [];

      results.forEach(result => {
        let user: IPerformance = {id: result.userId, manHoursSet: result._sum.manHoursSet ? result._sum.manHoursSet : 0, manHoursCompleted: result._sum.manHoursCompleted ? result._sum.manHoursCompleted : 0 };
        users.push(user);
      })      

      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "Users not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting teams" });
  } finally {
    await prisma.$disconnect();
  }
}
