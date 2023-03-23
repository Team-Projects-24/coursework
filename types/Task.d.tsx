import { IProject } from "./Project.d";
import { ISubTask } from "./SubTask.d";
import { IUser } from "./User.d";

/**
 * @author Tom Whitticase
 *
 * @description This is the task interface. It is used to define the task object.
 */

export interface ITask {
  id: number;
  name: string;
  description: string;
  projectName: string | null;
  status: "to-do" | "in-progress" | "review" | "completed";
  user: IUser;
  deadline: Date;
  archived: boolean;
  manHours: number;
  subTasks: ISubTask[];
}

//interface that defines data required to make a new task
export interface ICreateTask {
  name: string;
  description: string;
  projectId?: number;
  status: "to-do" | "in-progress" | "review" | "completed";
  userId: string;
  deadline: Date;
  manHours: number;
  subTasks: ISubTask[];
}
