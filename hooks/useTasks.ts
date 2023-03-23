// import axios from "axios";
// import { useEffect, useState } from "react";
// import useAlertStore from "stores/alertStore";
// import useUserStore from "stores/userStore";
// import { ICreateTask, ITask } from "types/Task.d";
// import { debounce } from "lodash";

// /**
//  * @author Tom Whitticase
//  *
//  * @description This hook is used to get tasks from the database.
//  *
//  * @output {ITask[]} tasks - All tasks
//  * @output {boolean} loading - Whether the tasks are still loading
//  * @output {boolean} loadingEditTask - Whether the edit task is still loading
//  * @output {boolean} loadingDeleteTask - Whether the delete task is still loading
//  * @output {boolean} loadingCreateTask - Whether the create task is still loading
//  * @output {function} editTask - Function to edit a task
//  * @output {function} deleteTask - Function to delete a task
//  * @output {function} createTask - Function to create a task
//  */

// ///////UNDER CONSTRUCTION///////

// interface IProps {
//   all?: boolean;
//   belongingToMyProjects?: boolean;
// }
// export const useTasks = ({ all, belongingToMyProjects }: IProps) => {
//   const { user } = useUserStore();
//   const { addAlert } = useAlertStore();
//   const [loading, setLoading] = useState(true);
//   const [tasks, setTasks] = useState<ITask[]>([]);
//   const [loadingEditTask, setLoadingEditTask] = useState(false);
//   const [loadingDeleteTask, setLoadingDeleteTask] = useState(false);
//   const [loadingCreateTask, setLoadingCreateTask] = useState(false);

//   const fetchData = debounce(async () => {
//     setLoading(true);
//     if (!user) {
//       setLoading(false);
//       return;
//     }
//     const id = user.userId;

//     try {
//       const response = await axios.post("/api/tasks/getTasks", {
//         id,
//         all,
//         belongingToMyProjects,
//       });
//       setTasks(response.data);
//     } catch (error) {
//       console.error(error);
//       // addAlert("Unable to fetch tasks", "error");
//     }
//     setLoading(false);
//   }, 500);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const editTask = async (task: ITask) => {
//     setLoadingEditTask(true);
//     try {
//       // Optimistic reloading: update the local state before the server responds
//       setTasks((prevTasks) =>
//         prevTasks.map((prevTask) => {
//           if (prevTask.id === task.id) {
//             // Only copy over the properties that need to be updated
//             return {
//               ...prevTask,
//               name: task.name,
//               description: task.description,
//               projectName: task.projectName,
//               status: task.status,
//               user: task.user,
//               deadline: task.deadline,
//               archived: task.archived,
//               manHours: task.manHours,
//               subTasks: task.subTasks,
//             };
//           } else {
//             return prevTask;
//           }
//         })
//       );
//       const response = await axios.post("/api/tasks/editTask", { task });
//     } catch (error) {
//       console.error(error);
//       addAlert("Unable to update task", "error");
//       // If there's an error, roll back the changes to the local state
//       fetchData();
//     }
//     setLoadingEditTask(false);
//   };

//   const deleteTask = async (id: number) => {
//     setLoadingDeleteTask(true);
//     try {
//       const response = await axios.post("/api/tasks/deleteTask", { id });
//       setTasks((prevTasks) =>
//         prevTasks.filter((prevTask) => prevTask.id !== id)
//       );
//       addAlert("Successfully deleted task", "success");
//     } catch (error) {
//       console.error(error);
//       addAlert("Unable to delete task", "error");
//     }
//     setLoadingDeleteTask(false);
//   };

//   const createTask = async (newTask: ICreateTask) => {
//     setLoadingCreateTask(true);
//     try {
//       const response = await axios.post("/api/tasks/createTask", {
//         task: newTask,
//       });
//       fetchData();
//       addAlert("Successfully created task", "success");
//     } catch (error) {
//       console.error(error);
//       addAlert("Unable to create task", "error");
//     }
//     setLoadingCreateTask(false);
//   };

//   return {
//     loading,
//     tasks,
//     editTask,
//     deleteTask,
//     createTask,
//     loadingEditTask,
//     loadingDeleteTask,
//     loadingCreateTask,
//   };
// };
