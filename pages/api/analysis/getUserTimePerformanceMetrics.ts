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
    //const { userIDs, timeframe } = req.body;
    const { query } = req;
    let userIDs = query.userIDs;
    let timeframe = query.timeframe;
    if (typeof userIDs === 'string' || userIDs instanceof String){
      userIDs = userIDs.split(",");
    }
    //console.log(userIDs);

    if (!userIDs && !timeframe) {
      res
        .status(400)
        .json({ message: "Required fields are missing in the request." });
      return;
    }

    let results;
    if (timeframe === "month"){
      results = await prisma.$queryRaw<ITimeFramePerformance[]>`select userId as "id", date_format(date,"%m-%Y") as "dateFormatted", sum(PerformanceLog.manHoursCompleted) as "manHoursCompleted" from Task inner join PerformanceLog on Task.taskId = PerformanceLog.taskId group by userId, dateFormatted having id in (${Prisma.join(userIDs)}) order by dateFormatted asc;`
    }
    else if (timeframe === "week"){
      results = await prisma.$queryRaw<ITimeFramePerformance[]>`select userId as "id", concat(date_format(date,"%Y-%m"), " wk ", (week(date,1) - (week(date_format(date,"%Y-%m-01")) - 1))) as "dateFormatted", sum(PerformanceLog.manHoursCompleted) as "manHoursCompleted" from Task inner join PerformanceLog on Task.taskId = PerformanceLog.taskId group by userId, dateFormatted having id in (${Prisma.join(userIDs)}) order by dateFormatted asc;`
    }
    else{
      results = await prisma.$queryRaw<ITimeFramePerformance[]>`select userId as "id", date_format(date,"%d-%m-%Y") as "dateFormatted", sum(PerformanceLog.manHoursCompleted) as "manHoursCompleted" from Task inner join PerformanceLog on Task.taskId = PerformanceLog.taskId group by userId, dateFormatted having id in (${Prisma.join(userIDs)}) order by dateFormatted asc;`
    }
    //const results = await prisma.$queryRaw<ITimeFramePerformance[]>`select userId as "id", date, sum(PerformanceLog.manHoursCompleted) as "manHoursCompleted" from Task inner join PerformanceLog on Task.taskId = PerformanceLog.taskId group by userId, date having id in (${Prisma.join(userIDs)}) order by date asc;`;

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