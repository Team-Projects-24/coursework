import { IUser } from "./User.d";
import { IChatroom } from "./Chatroom.d";
import { Chatroom, SeenBy } from "@prisma/client";

/**
 * @author Ben Pritchard
 *
 * @description This is the message interface. It is used to define the message object.
 */

export interface IChatMessage {
  id: number;
  chatroomId: number;
  senderId: string;
  content: string;
  sentAt: Date;
  sender: IUser;
  chatroom: Chatroom;
  seenBy: SeenBy;
}
