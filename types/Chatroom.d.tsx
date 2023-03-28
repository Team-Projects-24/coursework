import { ChatInvite, Chatroom, User } from "@prisma/client";
import { IChatMessage } from "./ChatMessage.d";

export type IChatroom = Chatroom & {
  members: User[];
  sentInvite: ChatInvite[];
  messages: IChatMessage[];
};
