/**
 * 
 * @asuthor Olivia Gray
 * 
 * @description Pull all performance metrics of the selected users over the given timeframe
 * 
 */


import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient, Team, User } from "@prisma/client";
import { ITimeFramePerformance } from "types/analysis/TimeFramePerformance.d";

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

    const results = await prisma.$queryRaw<ITimeFramePerformance[]>`select userId as "id", date, sum(manHoursSet) as "manHoursSet", sum(manHoursCompleted) as "manHoursCompleted" from PerformanceLog group by id, date having id in (${Prisma.join(userIDs)});`;

    //console.log(results);
    if (results) {    
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "Users not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting users" });
  } finally {
    await prisma.$disconnect();
  }
}


/** 
 * select userId as "id", date, sum(manHoursSet) as "manHoursSet", sum(manHoursCompleted) as "manHoursCompleted" from PerformanceLog group by id, date having id in ("Anna","Lynn");
 */