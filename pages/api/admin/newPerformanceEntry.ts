// api for setting a new log in the performance table and updating relating tables

// need the person who's doing the work, how many hours they've done, for which task, for which team (maybe) and set it to the current date

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // Handle POST request
    if (req.method === "POST") {
      const { taskId, manHoursSet, manHoursCompleted } = req.body;

      try {
        const newEntry = await prisma.performanceLog.create({
          data: {
            taskId: Number(taskId),
            manHoursSet: Number(manHoursSet),
            manHoursCompleted: Number(manHoursCompleted),
          },
        });

        res.status(201).json(newEntry);
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error creating performance entry", error }); // this is the error occuring
      }
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ message: "Method not supported" });
  }
};
