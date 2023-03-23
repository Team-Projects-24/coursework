// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useProjects } from "./useProjects";

// export const useProjectTasks = (id: string) => {
//   const [projectTasks, setProjectTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { projects } = useProjects();

//   useEffect(() => {
//     const getProjectTasks = async () => {
//       try {
//         const data = { id };
//         const response = await axios.post(
//           "/api/projects/getProjectTasks",
//           data
//         );
//         setProjectTasks(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       }
//     };

//     if (id) {
//       getProjectTasks();
//     }
//   }, [id, projects]);

//   return { loading, projectTasks };
// };
