/**
 *
 * @author Euan Hall (Individual view)
 *
 *
 */

import { use, useEffect, useState } from "react";
import useUserStore from "stores/userStore";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { BarCard } from "components/dashboard/BarCard";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import { ITask } from "types/analysis/Task.d";



function IndividualUserView() {
   const { user } = useUserStore();
   const [taskData, setTaskData] = useState<ITask[] | null>(null);
   const pieChartData = [
     {
       id: "To-do",
       label: "To-do",
       value: 20,
       color: "hsl(339, 70%, 50%)",
     },
     {
       id: "Doing",
       label: "in-Progress",
       value: 10,
       color: "hsl(330, 70%, 50%)",
     },
     {
       id: "Completed",
       label: "Completed",
       value: 4,
       color: "hsl(299, 70%, 50%)",
     },
   ];

   useEffect(() => {
    loadIndividualProgress();
  }, []);

   async function loadIndividualProgress() {
      try{
        axios
          .post("api/analysis/getTasks", {
            userID: "Anna",
          })
          .then((response) => {
            console.log(response.data);
            setTaskData(response.data);

          });
      } catch(error){
        console.error(error.response.data);
      }
   }

   function updatePieChart() {}
   function updateTaskList() {}

   function checkScreenSize(): boolean {
     let isScreenLarge = true; // Assume screen is large by default
     console.log("HERE");
     const updateScreenSize = () => {
       const screenWidth = window.innerWidth;
       if (screenWidth < 620) {
         isScreenLarge = false;
       } else {
         isScreenLarge = true;
       }
     };
     updateScreenSize(); // Call initially to set the initial screen size
     window.addEventListener("resize", updateScreenSize); // Listen for resize events and update the screen size
     return isScreenLarge;
   }

   return (
   <div id="UserView" className="flex w-full">
   	<div className="overflow-x-auto w-full mobile-only:pb-[4rem]">
	  <div>
	   <div className="md:flex flex-row py-4 shadow-lg justify-between">
	     <h1 className="px-4 text-2xl ">{user?.name}'s Task list</h1>
	   </div>
	    	{performanceData?.map((data) => (
	    		<Box className="flex desktop-only:flex-row py-2 px-4 w-full mobile-only:flex-col">
        			<BarCard title={data.taskName} total={data.set} completed={data.completed} totalLabel={"Total"} isHours={true} />
        		</Box>
      	    	))}
	  </div>
        </div>
        <Card elevation={2} className=" p-2 w-1/2 h-5/6 text-center mobile-only:w-[100%]" sx={{ m: 2, height: 300, overflow: "auto" }} disableEqualOverflow>
		<CardContent sx={{ height: 420, width: "100%", overflowX: "hidden", scrollBehavior: "false",}} disableEqualOverflow>
			<Typography className="font-semibold text-left" sx={{ fontSize: 20 }}> Tasks Overview </Typography>
			<Divider />
			<ResponsivePie
				  enableArcLinkLabels={true}
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
			/>
	  </CardContent>
     </Card>
  </div>
	);
}

export default IndividualUserView;
