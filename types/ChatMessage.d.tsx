import { IUser } from "./User.d";
import { IChatroom } from "./Chatroom.d";

/**
 * @author Ben Pritchard
 *
 * @description This is the message interface. It is used to define the message object.
 */

export interface IChatMessage {
  id: number;
  chatroomId: number;
  senderId: number;
  body: string;
  timestamp: Date;
  sender: IUser;
  chatroom: IChatroom;
  seenByIds: string[];
}
