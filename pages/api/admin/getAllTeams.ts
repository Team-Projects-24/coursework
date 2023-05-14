// api for getting all team ids and names

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const teams = await prisma.team.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      console.log("Fetched teams:", teams);
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ error: "Error fetching teams" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
