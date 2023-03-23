// import axios from "axios";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import useAlertStore from "stores/alertStore";
// import useUserStore from "stores/userStore";
// import { ICreateProject } from "types/Project.d";
// import { IProject } from "types/Project.d";
// import { IUser } from "types/User.d";

// /**
//  * @author Ben Pritchard
//  *
//  * @description This hook is used to get projects from the database.
//  *
//  * @input {number} id - The id of the project to get users for
//  *
//  * @output {IProject[]} projects - All projects
//  * @output {boolean} loading - Whether the projects are still loading
//  * @output {function} editProject - Function to edit a project
//  * @output {function} deleteProject - Function to delete a project
//  * @output {function} createProject - Function to create a project
//  * @output {boolean} loadingEditProject - Whether the edit project is still loading
//  * @output {boolean} loadingDeleteProject - Whether the delete project is still loading
//  * @output {boolean} loadingCreateProject - Whether the create project is still loading
//  */

// export function useProjects(id?: number) {
//   const [projects, setProjects] = useState<IProject[]>([]); //returns all projects with access
//   // const [project, setProject] = useState<IProject | null>(); //returns single project with access
//   const [users, setUsers] = useState<IUser[] | null>([]); //returns all users with access
//   const [loading, setLoading] = useState(true);
//   const [loadingUsers, setLoadingUsers] = useState(false);
//   const [loadingCreateProject, setLoadingCreateProject] = useState(false);
//   const [loadingEditProject, setLoadingEditProject] = useState(false);
//   const [loadingDeleteProject, setLoadingDeleteProject] = useState(false);
//   const { addAlert } = useAlertStore();

//   const { user } = useUserStore();

//   const router = useRouter();

//   async function fetchData() {
//     setLoading(true);
//     try {
//       const response = await axios.post("/api/projects/getProjects", {
//         user,
//       });
//       const { data } = response;
//       setProjects(data);
//     } catch (error) {
//       console.error(error);
//     }
//     setLoading(false);
//   }

//   async function fetchUserData() {
//     setLoadingUsers(true);
//     try {
//       const response = await axios.post("/api/projects/getUserData", {
//         projectId: id,
//       });
//       const { data } = response;
//       setUsers(data);
//     } catch (error) {
//       console.error(error);
//     }
//     setLoadingUsers(false);
//   }
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const editProject = async (project: IProject) => {
//     setLoadingEditProject(true);
//     try {
//       const response = await axios.post("/api/projects/editProject", {
//         project: project,
//       });
//       setLoadingEditProject(false);
//       addAlert("Successfully edited project", "success");
//       fetchData();
//     } catch (error) {
//       console.error(error);
//       setLoadingEditProject(false);
//     }
//   };

//   const deleteProject = async (id: number) => {
//     setLoadingDeleteProject(true);
//     try {
//       console.log("deleting project ", id);
//       const response = await axios.post("/api/projects/deleteProject", {
//         id: id,
//       });
//       setLoadingDeleteProject(false);
//       addAlert("Successfully deleted project", "success");
//       router.push("/projects");
//     } catch (error) {
//       console.error(error);
//       setLoadingDeleteProject(false);
//     }
//   };

//   const createProject = async (newProject: ICreateProject) => {
//     setLoadingCreateProject(true);
//     try {
//       const response = await axios.post(
//         "/api/projects/createProject",
//         newProject
//       );
//       addAlert("Project created successfully", "success");
//       setLoadingCreateProject(false);
//       fetchData();
//     } catch (error) {
//       setLoadingCreateProject(false);
//       console.error(error);
//     }
//   };

//   return {
//     projects,
//     users,
//     loading,
//     editProject,
//     deleteProject,
//     createProject,
//     loadingEditProject,
//     loadingCreateProject,
//     loadingDeleteProject,
//   };
// }
