/**
 * 
 * @asuthor Olivia Gray
 * 
 * @description Pull all performance metrics of the selected teams in the given timeframe
 * 
 */


import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient, Team, User } from "@prisma/client";
import { IPerformance } from "types/analysis/Performance.d";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { teamIDs } = req.body;

    if (!teamIDs) {
      res
        .status(400)
        .json({ message: "Required fields are missing in the request." });
      return;
    }

    const results = await prisma.$queryRaw<IPerformance[]>`select teamId as "id", date, sum(PerformanceLog.manHoursCompleted) as "manHoursCompleted" from Task inner join PerformanceLog on Task.taskId = PerformanceLog.taskId group by id, date having id in (${Prisma.join(teamIDs)}) order by date asc;`;

    //console.log(results);
    if (results) {    
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "Teams not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting teams" });
  } finally {
    await prisma.$disconnect();
  }
}
//select teamId as "id", date, sum(manHoursSet), sum(manHoursCompleted) from PerformanceLog join UserOnTeam on PerformanceLog.userId = UserOnTeam.userId group by teamId, date having teamId in (1,3);