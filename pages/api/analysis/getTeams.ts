/**
 *
 * @author Olivia Gray
 *
 * @description Pull all the team IDs of the team the currently logged in user manages
 *
 */

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Team, User } from "@prisma/client";
import { ITeam } from "types/analysis/Team.d";
import prisma from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { teamID } = req.body;

    if (!teamID) {
      res
        .status(400)
        .json({ message: "Required fields are missing in the request." });
      return;
    }

    const results = await prisma.team.findMany({
      where: {
        id: { in: teamID },
      },
    });

    if (results) {
      let teams: ITeam[] = [];

      results.forEach((result) => {
        let team: ITeam = { teamID: result.id, name: result.name };
        teams.push(team);
      });

      res.status(200).json(teams);
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
