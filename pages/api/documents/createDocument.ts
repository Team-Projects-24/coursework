import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { ICreateDocument } from "types/Document.d";
import {
  sendErrorResponse,
  sendSuccessResponse,
  sendBadRequestResponse,
} from "../responses";

const prisma = new PrismaClient();

/**
 * @author Tom Whitticase
 *
 * @description Adds a new document to the database.
 *
 * @input {string} title - The title of the document
 * @input {string} topic - The topic of the document
 * @input {string} category - The category of the document
 * @input {string} body - The body of the document
 * @input {string} authorId - The ID of the author of the document
 *
 * @output {status: 200, message: "Document created successfully"} on success
 * @output {status: 400, message: "Missing required fields"} if required fields are missing
 * @output {status: 500, message: "Error creating document"} if there was an error creating the document
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Destructure the expected properties from the request body
  const { title, topic, category, body, authorId }: ICreateDocument = req.body;

  // Check if any of the required properties are missing
  if (!title || !topic || !category || !body || !authorId) {
    // If any of the required properties are missing, return a 400 Bad Request response
    return sendBadRequestResponse(res, { message: "Missing required fields" });
  }

  try {
    // Create a new document in the database
    const newDocument = await prisma.document.create({
      data: {
        authorId: authorId,
        title: title,
        topic: topic,
        body: Buffer.from(body, "utf8"),
        category: category,
      },
    });

    // If the document was created successfully, return a 200 Success response
    return sendSuccessResponse(res, {
      message: "Document created successfully",
    });
  } catch (error) {
    // If there was an error creating the document, return a 500 Internal Server Error response
    return sendErrorResponse(res, { message: "Error creating document" });
  } finally {
    // Disconnect from the database, regardless of whether there was an error or not
    await prisma.$disconnect();
  }
};
