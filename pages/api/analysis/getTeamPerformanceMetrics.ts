/**
 *
 * @asuthor Olivia Gray
 *
 * @description Pull all performance metrics of the selected teams
 *
 */

import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient, Team, User } from "@prisma/client";
import { IPerformance } from "types/analysis/Performance.d";
import prisma from "lib/prisma";

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

    const results = await prisma.$queryRaw<
      IPerformance[]
    >`select teamId as "id", sum(manHoursSet) as "manHoursSet", sum(manHoursCompleted) as "manHoursCompleted" from Task group by id having id in (${Prisma.join(
      teamIDs
    )});`;

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

/**
 * select teamId, sum(manHoursSet), sum(manHoursCompleted) from PerformanceLog join UserOnTeam on PerformanceLog.userId = UserOnTeam.userId group by teamId having teamId in (1,3);
 */
