import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { IEmployee } from "types/analysis/Employee.d";
import prisma from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //const { teamID } = req.body;
    const { query } = req;
    let teamID = query.teamID;
    if (typeof teamID === "string" || teamID instanceof String) {
      teamID = teamID.split(",");
    }

    if (!teamID) {
      res
        .status(400)
        .json({ message: "Required fields are missing in the request." });
      return;
    }

    const members = await prisma.user.findMany({
      include: {
        teams: true,
      },
    });

    if (members) {
      // Pre-process data so each member is placed in a sub-array for their team
      let employees: IEmployee[][] = [];

      for (let i = 0; i < teamID.length; i++) {
        // Create a sub-array for each team ID supplied
        let teamMembers: IEmployee[] = [];
        members.forEach((member) => {
          member.teams.forEach((team) => {
            // Only return employees that belong to queried teams
            if (teamID[i] === team.teamId) {
              let employee: IEmployee = {
                userID: member.userId,
                name: member.name,
                role: member.role,
                teamID: teamID[i],
              };
              teamMembers.push(employee);
            }
          });
        });
        employees.push(teamMembers);
      }

      res.status(200).json(employees);
    } else {
      res.status(404).json({ message: "Members not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting members" });
  } finally {
    await prisma.$disconnect();
  }
}
