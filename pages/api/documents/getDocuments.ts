import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { IDocument } from "types/Document.d";
import { IUser } from "types/User.d";
import { sendErrorResponse, sendSuccessResponse } from "../responses";

const prisma = new PrismaClient();

/**
 * @author Tom Whitticase
 *
 * @description This file implements the endpoint for getting a list of all documents.
 *
 * @output {status: 200, IDocument[]} on success
 * @output {status: 500, message: "Error getting documents"} if there was an error getting the documents
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get the array of all document models from the database
    const documentModels = await prisma.document.findMany({
      include: {
        author: true,
      },
    });

    // Initialize an array to store the documents
    let documents: IDocument[] = [];

    // Iterate over the document models
    documentModels.forEach((document) => {
      // Convert the author data to the IUser interface
      const author: IUser = {
        userId: document.author.userId,
        name: document.author.name,
        role: document.author.role.toLowerCase() as
          | "employee"
          | "manager"
          | "admin",
        profileImage: document.author.profileImage as string,
      };

      // Push the converted document to the documents array
      documents.push({
        id: document.id,
        title: document.title,
        body: document.body.toString("utf8"),
        topic: document.topic,
        category: document.category,
        updatedAt: document.updatedAt,
        createdAt: document.createdAt,
        author: author,
      } as IDocument);
    });

    // Send the array of documents to the client
    sendSuccessResponse(res, documents);
  } catch (e) {
    // Send a 500 error response if an error occurs
    sendErrorResponse(res, e);
  } finally {
    // Close the database connection
    await prisma.$disconnect();
  }
}
