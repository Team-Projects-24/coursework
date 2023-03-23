import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { IDocument } from "types/Document.d";
import {
  sendErrorResponse,
  sendSuccessResponse,
  sendBadRequestResponse,
} from "../responses";

const prisma = new PrismaClient();

/**
 * @author Tom Whitticase
 *
 * @description This file implements the endpoint for updating a document in the database.
 *
 * @input {IDocument} document - document with updated values
 *
 * @output {status: 200, message: "Document updated successfully"} on success
 * @output {status: 400, message: "Required fields are missing in the request."} if required fields are missing
 * @output {status: 500, message: "Error updating document"} if there was an error updating the document
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const document: IDocument = req.body.document;

    // Validate that the required fields are present in the request
    if (
      !document ||
      !document.id ||
      !document.title ||
      !document.topic ||
      !document.body ||
      !document.category ||
      !document.author
    ) {
      return sendBadRequestResponse(res, {
        message: "Required fields are missing in the request.",
      });
    }

    const { id, title, topic, category, body, author } = document;

    await prisma.document.update({
      where: { id },
      data: {
        authorId: author.userId,
        title,
        topic,
        body: Buffer.from(body, "utf8"),
        category,
      },
    });

    return sendSuccessResponse(res, {
      message: "Document updated successfully",
    });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, error);
  } finally {
    await prisma.$disconnect();
  }
};
