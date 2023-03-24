import { IChatInvite } from "./ChatInvite.d";
import { IChatMessage } from "./ChatMessage.d";
import { IUser } from "./User.d";

export interface IChatroom {
  id: number;
  name: string;
  description: string;
  private: boolean;
  creatorId: string;
  sentInvites: IChatInvite[];
  chatMessages: IChatMessage[];
  chatUsers: IUser[];
}

export interface IChatroomInfo {
  id: number;
  name: string;
  description: string;
  private: boolean;
  creatorId: string;
  chatUsers: IUser[];
}
