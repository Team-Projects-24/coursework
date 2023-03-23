import { Card, CardContent, Typography, Divider } from "@mui/material";
import React from "react";

interface IProps {
  name: string;
}

const ProjectWidget = (projects: IProps[]) => {
  return (
    <>
      <Card
        elevation={2}
        className="p-1 w-1/2 mobile-only:w-[90%]"
        sx={{ m: 2, minWidth: 275 }}
      >
        <CardContent>
          <div className="pb-3">
            <Typography variant="h5" component="div">
              My Projects
            </Typography>
          </div>
          <Divider />
          {projects.length === 0 ? (
            <div className="font-bold py-4 text-center align-middle">
              You are not on any projects!
            </div>
          ) : (
            <>
              {projects.map((project) => (
                <div className="flex flex-col p-1">
                  <div className="flex justify-evenly py-2">
                    <h2 className="flex">{project.name}</h2>
                  </div>
                  <Divider />
                </div>
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectWidget;
