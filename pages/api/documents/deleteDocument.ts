import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  sendErrorResponse,
  sendSuccessResponse,
  sendBadRequestResponse,
} from "../responses";

const prisma = new PrismaClient();

/**
 * @author Tom Whitticase
 *
 * @description This file implements the endpoint for deleting a document from the database.
 *
 * @input {string} id - The ID of the document to delete
 *
 * @output {status: 200, message: "Document deleted successfully"} on success
 * @output {status: 400, message: "Missing required fields"} if required fields are missing
 * @output {status: 500, message: "Error deleting document"} if there was an error deleting the document
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Check if the document ID was provided
  const { id } = req.body;
  if (!id) {
    sendBadRequestResponse(res, "Missing required fields");
    return;
  }

  try {
    // Attempt to delete the document
    const deletedDocument = await prisma.document.delete({
      where: { id },
    });
    sendSuccessResponse(res, { message: "Document deleted successfully" });
  } catch (e) {
    console.error(e);
    sendErrorResponse(res, "Error deleting document");
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
  }
};
