/**
 * @author Ben Pritchard
 *
 * @description This is the user interface. It is used to define the user object.
 */

import { User, Chatroom } from "@prisma/client";

export type IUser = User & {
  chatrooms: Chatroom[]
};
