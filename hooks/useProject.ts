// import { useState, useEffect } from "react";
// import { useProjects } from "./useProjects";
// import { IProject } from "types/Project.d";

// export const useProject = (projectId: number) => {
//   const [project, setProject] = useState<null | IProject>();
//   const [loading, setLoading] = useState(true);
//   const { projects } = useProjects();

//   useEffect(() => {
//     const project = projects?.find((project) => project.id === projectId);
//     setProject(project);
//     setLoading(false);
//   }, [projectId, projects]);

//   return { loading, project };
// };
