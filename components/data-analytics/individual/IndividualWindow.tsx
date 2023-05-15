/**
 *
 * @author Euan Hall (Individual view)
 *
 *
 */

import { useEffect, useState } from "react";
import useUserStore from "stores/userStore";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
// import { BarCard } from "components/dashboard/BarCard";
import { ResponsivePie } from "@nivo/pie";
import ProgressCard from "./ProgressCard";
import axios from "axios";
import { Task } from "@prisma/client";

function IndividualUserView() {
  const { user } = useUserStore();
  const [taskData, setTaskData] = useState<Task[] | null>(null);
  const [isScreenLarge, setIsScreenLarge] = useState(true);
  const [totalHours, setTotalHours] = useState(0);
  const [totalCompleted, setCompleted] = useState(0);
  const [totalHoursDifference, setDifference] = useState(0);
  const [pieChartData, setPieChartData] = useState<[] | null>(null);

  useEffect(() => {
    const updateScreenSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 620) {
        setIsScreenLarge(false);
      } else {
        setIsScreenLarge(true);
      }
    };

    updateScreenSize(); // Call initially to set the initial screen size
    window.addEventListener("resize", updateScreenSize); // Listen for resize events and update the screen size

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  useEffect(() => {
    async function loadIndividualProgress() {
      const response = await axios.post("api/analysis/getTasks", {
        userID: user?.userId, // Assuming `user` object has an `id` property.
      });
      console.log(response.data);
      setTaskData(response.data);

      /*let totalHours = 0;
      let totalCompleted = 0;
      taskData?.map((data: Task) => (
        totalHours += data?.manHoursSet
      ));

      taskData?.map((data: Task) => (
        totalCompleted += data?.manHoursCompleted
      ));
      
      setTotalHours(totalHours);
      setCompleted(totalCompleted);
      setDifference(totalHours - totalCompleted);*/
    }

    loadIndividualProgress();
  }, [user]);

  useEffect(() =>{
    const response = axios.post("api/analysis/getTasks", {
      userID: user?.userId, // Assuming `user` object has an `id` property.
    });
    let totalHours = 0;
    let totalCompleted = 0;
    taskData?.map((data: Task) => (
      totalHours += data?.manHoursSet
    ));

    taskData?.map((data: Task) => (
      totalCompleted += data?.manHoursCompleted
    ));
    
    setTotalHours(totalHours);
    setCompleted(totalCompleted);
    setDifference(totalHours - totalCompleted);

  })

  return (
    <div id="UserView" className="flex w-full">
      <div className="overflow-x-auto w-full mobile-only:pb-[4rem]">
        <div>
          <div className="md:flex flex-row py-4 shadow-lg justify-between">
            <h1 className="px-4 text-2xl ">{user?.name}'s Task list</h1>
            <label className="switch">
              Hide from other managers (manager only)
              <input type="checkbox"></input>
              <span className="slider round"></span>
            </label>
          </div>
          { taskData?.map((data: Task) => (
              <ProgressCard data={data}></ProgressCard>
          ))}
        </div>
      </div>
      <Card
        elevation={2}
        className=" p-2 w-1/2 h-5/6 text-center mobile-only:w-[100%]"
        sx={{ m: 2, height: 300, overflow: "auto" }}
      >
        <CardContent
          sx={{
            height: 420,
            width: "100%",
            overflowX: "hidden",
            scrollBehavior: "false",
            overflowY: "auto",
          }}
        >
          <Typography className="font-semibold text-left" sx={{ fontSize: 20 }}>
            {" "}
            Tasks Overview{" "}
          </Typography>
          <Divider />
          <ResponsivePie
            enableArcLinkLabels={true}
            data={[{
              id: "To-do",
              label: "To-do",
              value: totalHoursDifference ,
              color: "hsl(339, 70%, 50%)",
            },
            {
              id: "Doing",
              label: "Total Hours",
              value: totalCompleted,
              color: "hsl(330, 70%, 50%)",
            },
            {
              id: "Total Hours",
              label: "Total Hours",
              value: totalHours,
              color: "hsl(299, 70%, 50%)",
            },
          ]}
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
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default IndividualUserView;
