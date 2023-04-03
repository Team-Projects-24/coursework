/**
 * @author Olivia Gray 
 *
 * @description This is the employee interface. It is used to define the employee object.
 */

export interface IEmployee {
  userId: string;
  name: string;
  role: "EMPLOYEE" | "MANAGER" | "TEAMLEADER";
  
}