/**
 * @author Matthew Fuller and Tom Whitticase
 *
 * @description API to send and invitation link to a given email address.
 * adds a referral code to the database which will be used to authenticate the user when attempting to register
 * @Input email address of new user
 * @Output if the email has sent or not
 */
import { PrismaClient } from "@prisma/client";
import sendgrid from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  sendBadRequestResponse,
  sendErrorResponse,
  sendSuccessResponse,
} from "../responses";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Extract the email address from the request body
  const emailAddress = req.body.emailAddress;
  // Check that the email address was provided
  if (!emailAddress) {
    return sendBadRequestResponse(res, {
      message: "No email address provided",
    });
  }

  function generateOTP(): string {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }

  // Define a function to send the verification email
  const sendEmail = async (verificationEmail: string) => {
    try {
      // Set the API key for the SendGrid email service
      sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

      const otp: string = generateOTP();

      //add otp to database
      const addedReferral = await prisma.referral.create({
        data: {
          code: otp,
        },
      });

      // Define the email message
      const msg = {
        to: verificationEmail,
        from: "makeitall816@gmail.com",
        subject: "Invite Email",
        text: "This is an invite email for Make-it-all",
        html: `<strong>Your Invite link to register for Make-it-all is: http://35.189.83.213/register?ref=${otp}</strong>`,
      };

      // Send the email message
      await sendgrid.send(msg);

      // Log that the email was sent
      console.log(`Email sent to ${verificationEmail}`);
    } catch (error) {
      // If there was an error sending the email, log the error and send an error response
      console.error(error);
      sendErrorResponse(res, { message: "Error sending email" });
    }
  };

  // Try to send the verification email and send a success response if successful
  try {
    await sendEmail(emailAddress);
    sendSuccessResponse(res, { message: "Email sent" });
  } catch (error) {
    // If there was an error sending the email, log the error and send an error response
    console.error(error);
    sendErrorResponse(res, { message: "Error sending email" });
  }
};
