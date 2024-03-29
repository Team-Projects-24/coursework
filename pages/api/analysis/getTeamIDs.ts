import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Team, User } from "@prisma/client";
import { ITeam } from "types/analysis/Team.d";
import prisma from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //const { leaderID, role } = req.body;
    const { query } = req;
    const leaderID = query.leaderID.toString();
    const role = query.role;

    if (!leaderID && !role) {
      res
        .status(400)
        .json({ message: "Required fields are missing in the request." });
      return;
    }
    console.log(role);
    let results;
    if (role === "TEAMLEADER") {
      results = await prisma.team.findMany({
        where: {
          leaderId: leaderID,
        },
      });
    } 
    else {
      results = await prisma.team.findMany({});
    }

    if (results) {
      let teamIDs: String[] = [];

      results.forEach((result) => {
        teamIDs.push(result.id);
      });

      res.status(200).json(teamIDs);
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
