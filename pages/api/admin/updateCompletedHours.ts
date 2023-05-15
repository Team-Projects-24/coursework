// api for updating the number of completed hours to be the same as current plus extra amount

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const taskId = parseInt(req.query.id as string, 10);
    const { additionalHours } = req.body;

    if (!additionalHours || isNaN(taskId)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    try {
      const updatedTask = await prisma.task.update({
        where: { taskId: taskId },
        data: {
          manHoursCompleted: {
            increment: additionalHours,
          },
        },
      });

      res.json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating task" });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ message: "Method not supported" });
  }
};
