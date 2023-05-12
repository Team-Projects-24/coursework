/**
 *
 * @asuthor Olivia Gray
 *
 * @description Pull all performance metrics of the selected users
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
    //const { userIDs } = req.body;
    const { query } = req;
    let userIDs = query.userIDs;
    if (typeof userIDs === 'string' || userIDs instanceof String){
      userIDs = userIDs.split(",");
    }

    if (!userIDs) {
      res
        .status(400)
        .json({ message: "Required fields are missing in the request." });
      return;
    }

    const results = await prisma.$queryRaw<
      IPerformance[]
    >`select userId as "id", sum(manHoursSet) as "manHoursSet", sum(manHoursCompleted) as "manHoursCompleted" from Task group by id having id in (${Prisma.join(
      userIDs
    )});`;

    if (results) {
      res.status(200).json(results);
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
