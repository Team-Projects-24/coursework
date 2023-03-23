import { IUser } from "./User.d";

/**
 * @author Tom Whitticase
 *
 * @description This is the document interface. It is used to define the document object.
 */

export interface IDocument {
  id: number;
  title: string;
  topic: string;
  createdAt: Date;
  updatedAt: Date;
  category: "TECHNICAL" | "NONTECHNICAL";
  body: string;
  author: IUser;
}

//interface that defines data required to make a new document
export interface ICreateDocument {
  title: string;
  topic: string;
  body: string;
  category: "TECHNICAL" | "NONTECHNICAL";
  authorId: string; //email address
}
