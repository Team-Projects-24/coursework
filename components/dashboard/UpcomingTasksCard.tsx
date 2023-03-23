import { Card, CardContent, Divider, Typography } from "@mui/material";
import React from "react";

// upcoming tasks card widget for dashboard

interface IProps {
  upcomingTasks: { title: string; daysTill: number }[];
}

const getDaysColor = (daysTill: number) => {
  switch (true) {
    case daysTill <= 2: {
      return "text-red-500";
    }
    case daysTill <= 4: {
      return "text-orange-500";
    }
    default: {
      return "text-green-500";
    }
  }
};

export default function UpcomingTasksCard({ upcomingTasks }: IProps) {
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
              sx={{ fontSize: 20 }}
              className="font-semibold "
            >
              Upcoming Tasks
            </Typography>
          </div>
          <Divider />
          {upcomingTasks.length === 0 ? (
            <div className="font-bold py-4 text-center align-middle">
              No Deadlines approaching
            </div>
          ) : (
            <>
              {upcomingTasks.map((task, i) => (
                <div className="flex flex-col p-1" key={i}>
                  <div className="flex justify-between py-2">
                    <h2 className="flex">{task.title}</h2>
                    <h2
                      className={`flex justify-center font-bold ${getDaysColor(
                        task.daysTill
                      )}`}
                    >
                      {task.daysTill === 0
                        ? "Due today"
                        : `${task.daysTill} Day${
                            task.daysTill > 1 ? "s" : ""
                          } left`}
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
