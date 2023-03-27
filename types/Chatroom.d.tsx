import { ChatInvite, Chatroom, User } from "@prisma/client";

export type IChatroom = Chatroom & {
  members: User[];
  sentInvite: ChatInvite[];
};
