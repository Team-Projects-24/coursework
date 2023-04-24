import { User, Chatroom } from "@prisma/client";
import { IChatroomInfo } from "./Chatroom.d";

/**
 * @author Ben Pritchard
 *
 * @description This is the user interface. It is used to define the user object.
 */

export interface IUser {
  userId: string;
  name: string;
  profileImage: string;
  role: "EMPLOYEE" | "MANAGER" | "TEAMLEADER";
  chatrooms: IChatroomInfo[];
}
