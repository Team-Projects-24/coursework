/**
 * @author Tom Whitticase
 *
 * @description This is the user interface. It is used to define the user object.
 */

export interface IUser {
  userId: string;
  name: string;
  profileImage: string;
  role: "employee" | "manager" | "admin";
}
