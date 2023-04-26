import { Chatroom, User } from "@prisma/client";
import { IChatMessage } from "./ChatMessage.d";
import { IUser, IUserInfo } from "./User.d";

export interface IChatroom {
  id: number;
  name: string;
  description: string;
  private: boolean;
  creatorId: string;
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

export interface ICreateChatroom {
  name: string;
  private: boolean;
  creatorId: string;
  chatImage: string;
  members: string[];
}
