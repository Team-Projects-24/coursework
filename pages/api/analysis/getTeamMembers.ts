
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Team, User } from "@prisma/client";
import { IEmployee } from "types/analysis/Employee.d";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //const { teamID } = req.body;
    let teamID = [1,2];


    if (!teamID) {
      res
        .status(400)
        .json({ message: "Required fields are missing in the request." });
      return;
    }

    const members = await prisma.user.findMany({
      include: {
        teams: true
      }
    })

    if (members) {

      let employees: any[] = [];

      // Pre-processing before sending back to client
      members.forEach(member => {
        // Only pass back members of specified teams
        teamID.forEach(team => {
          if (team in member.teams) {
            // Put into Employee datatype so its easy to use client-side
            let employee: IEmployee = {userID: member.userId, name:member.name, role:member.role, teamID:team}
            employees.push(employee);
          }}); 
      });

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