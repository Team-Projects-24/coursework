import { NextApiResponse } from "next";

/**
 * @author Tom Whitticase
 *
 * @description functions for sending responses to the client for use in API endpoints
 */

//success response
export function sendSuccessResponse(res: NextApiResponse, data: any) {
  res.status(200).json(data);
}
//unauthorized response
export function sendUnauthorizedResponse(res: NextApiResponse, error: any) {
  res.status(401).json({ message: error.message });
}
//bad request response
export function sendBadRequestResponse(res: NextApiResponse, error: any) {
  res.status(400).json({ message: error.message });
}
//error response
export function sendErrorResponse(res: NextApiResponse, error: any) {
  res.status(500).json({ message: error.message });
}
//resource not found response
export function sendNotFoundResponse(res: NextApiResponse, error: any) {
  res.status(404).json({ message: error.message });
}
