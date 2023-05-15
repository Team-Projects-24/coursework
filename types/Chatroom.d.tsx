import { Chatroom, User } from "@prisma/client";
import { IChatMessage } from "./ChatMessage.d";
import { IUser, IUserInfo } from "./User.d";

export interface IChatroom {
  id: string;
  name: string;
  description: string;
  private: boolean;
  creatorId: string;
  chatMessages: IChatMessage[];
  members: IUser[];
}

export interface IChatroomInfo {
  id: string;
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
  description: string;
}

export interface IEditChat {
  name: string;
  description: string;
  members: string[];
  chatImage:string;
}
