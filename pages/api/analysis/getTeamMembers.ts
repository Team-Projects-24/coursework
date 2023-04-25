import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient} from "@prisma/client";
import { IEmployee } from "types/analysis/Employee.d";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  try {
    const { teamID } = req.body;

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
