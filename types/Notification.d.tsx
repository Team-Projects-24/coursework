import { IUser } from "./User.d";

/**
 * @author Tom Whitticase
 *
 * @description This is the notification interface. It is used to define the notification object.
 */

export interface INotification {
  id: number;
  user: IUser;
  route: string | null;
  title: string;
  date: Date;
}
