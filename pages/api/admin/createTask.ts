// api for creating a task


import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Console } from "console";

const prisma = new PrismaClient();

console.log("this file is reached");

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
      const { teamId, userId, deadline, name, manHoursSet } = req.body;
  
      console.log(teamId);
      console.log(userId);
      console.log(deadline);
      console.log(name);
      console.log(manHoursSet);
      

      try {
        const newTask = await prisma.task.create({
          data: {
            teamId,
            userId,
            deadline,
            name,
            manHoursSet,
            manHoursCompleted: 0,
          },
        });
  
        res.status(201).json(newTask);
      } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
      }
    } else {
      // Handle unsupported methods
      res.status(405).json({ message: "Method not supported" });
    }
  };
  