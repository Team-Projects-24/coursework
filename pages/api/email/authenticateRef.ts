import type { NextApiRequest, NextApiResponse } from "next";
import { sendErrorResponse, sendSuccessResponse } from "../responses";
import { PrismaClient } from "@prisma/client";

/**
 * @author Tom Whitticase
 *
 *  @description This function is used to authenticate a user's login details.
 */

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

// Handler function for the API endpoint
export default async function authenticateRefHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the reference code from the request body
  const ref = req.body.ref;

  // If the reference code is empty, send a successful response with authenticated=false
  if (!ref) {
    return sendSuccessResponse(res, false);
  }

  // Look up the referral in the database based on the reference code
  const invite = await prisma.referral.findFirst({
    where: {
      code: ref,
    },
  });

  // Check if the referral code has not expired
  const hasNotExpired = invite && isLessThan24HoursAgo(invite.createdAt);

  // Set the authenticated flag based on whether the referral code has not expired
  const authenticated = Boolean(hasNotExpired);

  // Send a successful response with the authenticated flag
  return sendSuccessResponse(res, authenticated);
}

// Helper function to check if a given date is less than 24 hours ago
function isLessThan24HoursAgo(date: Date): boolean {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hoursDiff = diff / (1000 * 60 * 60);
  return hoursDiff < 24;
}
