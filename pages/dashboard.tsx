import Head from "next/head";
import React, { useEffect } from "react";
import LoadingPage from "components/misc/LoadingPage";
// import { useTasks } from "hooks/useTasks";
import useUserStore from "stores/userStore";
import UpcomingTasksCard from "components/dashboard/UpcomingTasksCard";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { BarCard } from "components/dashboard/BarCard";
import { ResponsivePie } from "@nivo/pie";
import { ITask } from "types/Task.d";
import OverdueTasksCard from "components/dashboard/OverdueTasksCard";

/**
 * @author Luke Chester
 *
 * @description this is the dashboard page that displays personalised user information
 *
 */

export default function Dashboard() {
  // const { loading, tasks } = useTasks({});
  const { user } = useUserStore();

  // useEffect(() => {
  //   checkScreenSize();
  // }, []);

  //PIE CHART DATA
  // const pieChartData = [
  //   {
  //     id: "To-do",
  //     label: "To-do",
  //     value: getTaskToDo(),
  //     color: "hsl(339, 70%, 50%)",
  //   },
  //   {
  //     id: "in-Progress",
  //     label: "in-Progress",
  //     value: getTaskInProgress(),
  //     color: "hsl(330, 70%, 50%)",
  //   },
  //   {
  //     id: "review",
  //     label: "In-review",
  //     value: getTaskInReview(),
  //     color: "hsl(129, 70%, 50%)",
  //   },
  //   {
  //     id: "Completed",
  //     label: "Completed",
  //     value: getCompletedTasks(),
  //     color: "hsl(299, 70%, 50%)",
  //   },
  // ];

  // //Go through every task and count how many 'to-do' there are
  // function getTaskToDo(): number {
  //   let sumTaskToDo = 0;
  //   tasks.forEach((task: { status: string }) => {
  //     if (task.status === "to-do") {
  //       sumTaskToDo += 1;
  //     }
  //     return;
  //   });
  //   return sumTaskToDo;
  // }

  // //Go through every task and count how many 'In progress' there are
  // function getTaskInProgress(): number {
  //   let sumTaskInProgress = 0;
  //   tasks.forEach((task: { status: string }) => {
  //     if (task.status === "in-progress") {
  //       sumTaskInProgress += 1;
  //     }
  //     return;
  //   });
  //   return sumTaskInProgress;
  // }

  // //Go through every task and count how many in 'review' tasks there are
  // function getTaskInReview(): number {
  //   let sumTaskInReview = 0;
  //   tasks.forEach((task: { status: string }) => {
  //     if (task.status === "review") {
  //       sumTaskInReview += 1;
  //     }
  //     return;
  //   });
  //   return sumTaskInReview;
  // }

  // //Loops through tasks and retrieve total tasks
  // function getTotalTasks(): number {
  //   let totalTasks = 0;
  //   tasks.forEach((task: any) => {
  //     totalTasks += 1;
  //   });
  //   return totalTasks;
  // }

  // //Loop through tasks and retrieve all completed tasks
  // function getCompletedTasks(): number {
  //   let completedTasks = 0;
  //   tasks.forEach((task: { status: string }) => {
  //     if (task.status === "completed") {
  //       completedTasks += 1;
  //     }
  //     return;
  //   });
  //   return completedTasks;
  // }

  // //MANHOURS
  // //loops through tasks and gets total manhours
  // function getTotalManhours(): number {
  //   let totalManhours = 0;
  //   tasks.forEach((task: { manHours: any }) => {
  //     let taskManHours = task.manHours;
  //     totalManhours += taskManHours;
  //   });
  //   return totalManhours;
  // }

  // //loops through tasks and gets manhours worked
  // function getManhoursCompleted(): number {
  //   let manHoursCompleted = 0;
  //   tasks.forEach((task: { status: string; manHours: number }) => {
  //     if (task.status === "completed") {
  //       manHoursCompleted += task.manHours;
  //     }
  //     return;
  //   });
  //   return manHoursCompleted;
  // }

  // //Loop through tasks and get days until deadline and store in an array
  // interface ITaskOverdue {
  //   title: string;
  //   daysOver: number;
  // }

  // //Loops through task, checks the date, and filters through all tasks to see which have a date which is less than now
  // //If it is, then display on overdue tasks widget
  // function getOverdueTasks(tasks: ITask[]): ITaskOverdue[] {
  //   const now = new Date();
  //   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  //   const overdueTasks: ITaskOverdue[] = tasks
  //     .filter(
  //       (task) =>
  //         new Date(task.deadline).toISOString().substring(0, 10) <
  //           today.toISOString().substring(0, 10) && !task.archived
  //     )
  //     .map((task) => {
  //       const daysOver = Math.ceil(
  //         (today.getTime() - new Date(task.deadline).getTime()) /
  //           (1000 * 60 * 60 * 24)
  //       );
  //       const title = task.name;
  //       return { title, daysOver };
  //     });

  //   return overdueTasks;
  // }

  // //Loop through tasks and get an array of upcoming deadlines
  // interface ITaskUpcoming {
  //   title: string;
  //   daysTill: number;
  // }

  // //Fetches the tasks from the database that have an upcoming deadline, comparing deadline and todays date
  // //to calculate how many days left to complete the task
  // function getUpcomingTasks(tasks: ITask[]): ITaskUpcoming[] {
  //   const now = new Date();
  //   const upcomingTasks: ITaskUpcoming[] = tasks
  //     .map((task) => {
  //       const daysTill = Math.ceil(
  //         (new Date(task.deadline).getTime() - now.getTime()) /
  //           (1000 * 60 * 60 * 24)
  //       );
  //       const title = task.name;
  //       return { title, daysTill };
  //     })
  //     .filter((obj) => obj.daysTill >= 0 && obj.daysTill < 8);
  //   return upcomingTasks;
  // }

  // //if screen smaller than 620 then disable arclink labels
  // function checkScreenSize(): boolean {
  //   let isScreenLarge = true; // Assume screen is large by default
  //   console.log("HERE");
  //   const updateScreenSize = () => {
  //     const screenWidth = window.innerWidth;
  //     if (screenWidth < 620) {
  //       isScreenLarge = false;
  //     } else {
  //       isScreenLarge = true;
  //     }
  //   };
  //   updateScreenSize(); // Call initially to set the initial screen size
  //   window.addEventListener("resize", updateScreenSize); // Listen for resize events and update the screen size
  //   return isScreenLarge;
  // }

  return (
    <>
      {/* <Head>
        <title>Make-it-All | Dashboard</title>
      </Head>
      {loading ? (
        <LoadingPage variant={"spinner"} />
      ) : (
        <>
          <div className="md:flex flex-row py-4 shadow-lg justify-between">
            <h1 className="px-4 text-2xl ">Welcome, {user?.name}</h1>
          </div>
          <Box className="flex desktop-only:flex-row py-2 px-4 w-full mobile-only:flex-col">
            <BarCard
              title={"Manhours"}
              total={getTotalManhours()}
              completed={getManhoursCompleted()}
              totalLabel={"Total"}
              isHours={true}
            />
            <BarCard
              title={"My Tasks"}
              total={getTotalTasks()}
              completed={getCompletedTasks()}
              totalLabel={"Total"}
              isHours={false}
            />
          </Box>
          <Box className="flex desktop-only:flex-row px-4 p-30 mobile-only:flex-col ">
            <Card
              elevation={2}
              className=" p-2 w-1/2 h-1/2 text-center mobile-only:w-[100%]"
              sx={{ m: 2, height: 320, overflow: "auto" }}
            >
              <CardContent
                sx={{
                  height: 320,
                  width: "100%",
                  overflowX: "hidden",
                  scrollBehavior: "auto",
                }}
              >
                <Typography
                  className="font-semibold text-left"
                  sx={{ fontSize: 20 }}
                >
                  Tasks Overview
                </Typography>
                <Divider />
                <ResponsivePie
                  enableArcLinkLabels={checkScreenSize() ? true : false}
                  data={pieChartData}
                  margin={{ top: 20, right: 40, bottom: 100, left: 20 }}
                  innerRadius={0.4}
                  padAngle={0.7}
                  cornerRadius={1}
                  activeOuterRadiusOffset={1}
                  colors={{ scheme: "nivo" }}
                  borderWidth={0.5}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                  }}
                  arcLinkLabelsSkipAngle={1}
                  arcLinkLabelsTextColor="#333333"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: "color" }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                  }}
                  legends={[
                    {
                      anchor: "bottom",
                      direction: "column",
                      justify: false,
                      translateX: 0,
                      translateY: 100,
                      itemsSpacing: 1,
                      itemWidth: 80,
                      itemHeight: 20,
                      itemTextColor: "#999",
                      itemDirection: "left-to-right",
                      itemOpacity: 1,
                      symbolSize: 10,
                      symbolShape: "circle",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemTextColor: "#000",
                          },
                        },
                      ],
                    },
                  ]}
                />
              </CardContent>
            </Card>
            <OverdueTasksCard overdueTasks={getOverdueTasks(tasks)} />
            <UpcomingTasksCard upcomingTasks={getUpcomingTasks(tasks)} />
          </Box>
        </>
      )} */}
    </>
  );
}
