import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { IDocument } from "types/Document.d";
import { IUser } from "types/User.d";
import {
  sendErrorResponse,
  sendSuccessResponse,
  sendBadRequestResponse,
  sendNotFoundResponse,
} from "../responses";

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

/**
 * @author Tom Whitticase
 *
 * @description This file implements the endpoint for getting a document with the given id.
 *
 * @input {string} id - document id
 *
 * @output {status: 200, IDocument} on success
 * @output {status: 400, message: "Required fields are missing in the request."} if required fields are missing
 * @output {status: 500, message: "Error getting document"} if there was an error getting the document
 * @output {status: 404, message: "Document not found"} if the document was not found
 *
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Extract the id from the request body
    const { id } = req.body;

    // If the id is missing, return a 400 response with a message indicating that the required fields are missing
    if (!id) {
      sendBadRequestResponse(res, {
        message: "Required fields are missing in the request.",
      });
      return;
    }

    // Find the document with the given id
    const document = await prisma.document.findFirst({
      where: {
        id: id,
      },
      include: {
        author: true,
      },
    });

    // If the document was found, return a 200 response with the document data
    if (document) {
      // Convert the author data to the IUser type
      const author: IUser = {
        userId: document.author.userId,
        name: document.author.name,
        role: document.author.role.toLowerCase() as
          | "employee"
          | "manager"
          | "admin",
        profileImage: document.author.profileImage as string,
      };

      // Convert the document data to the IDocument type
      const resDoc: IDocument = {
        id: document.id,
        title: document.title,
        topic: document.topic,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
        category: document.category,
        body: document.body.toString("utf8"),
        author: author,
      };

      sendSuccessResponse(res, resDoc);
    } else {
      // If the document was not found, return a 404 response with a message indicating that the document was not found
      sendNotFoundResponse(res, { message: "Document not found" });
    }
  } catch (e) {
    // If an error occurs, return a 500 response with the error message
    sendErrorResponse(res, e);
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
  }
}
