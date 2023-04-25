import { Chatroom, User } from "@prisma/client";
import { IChatMessage } from "./ChatMessage.d";
import { IUser, IUserInfo } from "./User.d";
import { IChatInvite } from "./ChatInvite.d";

export interface IChatroom {
  id: number;
  name: string;
  description: string;
  private: boolean;
  creatorId: string;
  sentInvites: IChatInvite[];
  chatMessages: IChatMessage[];
  members: IUser[];
}

export interface IChatroomInfo {
  id: number;
  name: string;
  description: string;
  private: boolean;
  creatorId: string;
  chatImage: string;
  members: IUserInfo[];
}
