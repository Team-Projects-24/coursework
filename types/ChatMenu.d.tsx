import { Chatroom, User } from "@prisma/client";
import { IChatMessage } from "./ChatMessage.d";

export type IChatMenu = Chatroom & {
  members: User[];
  messages: IChatMessage[];
};
