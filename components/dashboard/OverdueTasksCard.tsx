import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

// overdue tasks card widget for dashboard

interface IProps {
  overdueTasks: { title: string; daysOver: number }[];
}

const getDaysColor = (daysOver: number) => {
  switch (true) {
    case daysOver >= 5: {
      return "text-red-500";
    }
    case daysOver >= 3: {
      return "text-orange-500";
    }
    default: {
      return "text-yellow-500";
    }
  }
};

export default function OverdueTasksCard({ overdueTasks }: IProps) {
  return (
    <>
      <Card
        elevation={2}
        className=" p-1 w-1/4 mobile-only:w-[90%]"
        sx={{ m: 2, minWidth: 275, maxHeight: 320, overflow: "auto" }}
      >
        <CardContent>
          <div className="pb-3">
            <Typography
              variant="h5"
              component="div"
              className="font-semibold "
              sx={{ fontSize: 20 }}
            >
              Overdue Tasks
            </Typography>
          </div>
          <Divider />
          {overdueTasks.length === 0 ? (
            <div className="font-bold py-4 text-center align-middle">
              No Tasks Overdue
            </div>
          ) : (
            <>
              {overdueTasks.map((task, i) => (
                <div className="flex flex-col p-1" key={i}>
                  <div className="flex justify-between py-2">
                    <h2 className="flex">{task.title}</h2>
                    <h2
                      className={`flex justify-center font-bold ${getDaysColor(
                        task.daysOver
                      )}`}
                    >
                      {task.daysOver} Day{task.daysOver > 1 && "s"} Overdue
                    </h2>
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
}
