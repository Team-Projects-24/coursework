import { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
// import { Session } from "next-auth";
// import { AccountRole } from "@prisma/client";
import prisma from "../lib/prisma";
import axios from "axios";

/**
 * API Handler Utility
 *
 * This utility simplifies the creation of Next.js API routes by providing a
 * consistent way to handle different HTTP methods, error handling, authenticating requests,
 * and authorizing user roles.
 *
 * Usage:
 * Import the apiHandler function and pass an object containing handlers
 * for each HTTP method (GET, POST, PUT, DELETE) you want to support.
 * Each handler should be an object with a "handler" key, an optional "requireAuth" key,
 * and an optional "roles" key for role-based access control.
 *
 * The "roles" key should be an array of allowed roles for that specific method.
 * If the user's role is not present in the array, the request will be denied.
 *
 * Examples:
 * export default apiHandler({
 *   GET: { handler: getHandler, requireAuth: true },
 *   POST: { handler: postHandler, requireAuth: false },
 *   PUT: { handler: putHandler, requireAuth: true, roles: [AccountRole.TEAMLEADER, AccountRole.MANAGER] },
 * });
 */

type ApiMethodHandler = (
  req: NextApiRequest,
  res: NextApiResponse
  //   session: Session | null
) => void | Promise<void>;

export interface IApiMethod {
  handler: ApiMethodHandler;
  //   requireAuth?: boolean;
  //   roles?: AccountRole[];
}

export interface IApiHandler {
  GET?: IApiMethod;
  POST?: IApiMethod;
  PUT?: IApiMethod;
  DELETE?: IApiMethod;
  [key: string]: IApiMethod | undefined;
}

export function apiHandler(handlers: IApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = handlers[req.method as string];

    // Get Session
    //I have no idea why but getSession only works if you remove the body from the request
    //so I'm doing that here and then adding it back in after
    const reqBody = req.body;
    let reqNoBody = req;
    reqNoBody.body = undefined;
    // const session = await getSession({ req: reqNoBody });
    req.body = reqBody;

    // User Authentication
    // if (method?.requireAuth !== false && (!session || !session.user)) {
    //   return res.status(401).json({ message: "Unauthorized", success: false });
    // }

    // Method Validation
    if (!method) {
      res.setHeader("Allow", Object.keys(handlers));
      res
        .status(405)
        .json({ message: `Method ${req.method} Not Allowed`, success: false });
      return;
    }

    // // Role Validation
    // if (method?.roles) {
    //   // Fetch role from Database
    //   const role = await prisma.user.findUnique({
    //     where: { id: session?.user.id },
    //     select: { role: true },
    //   });
    //   if (role && !method.roles.includes(role.role)) {
    //     // Identity is known, however incorrect permissions, return 403
    //     return res
    //       .status(403)
    //       .json({ message: "Forbidden Access", success: false });
    //   }
    //   if (!role) {
    //     // If no role then return 401 as identity is unknown
    //     return res
    //       .status(401)
    //       .json({ message: "Unauthorized gg", success: false });
    //   }
    // }

    // Request Propogation
    try {
      await method.handler(req, res);
      // await method.handler(req, res, session);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  };
}
