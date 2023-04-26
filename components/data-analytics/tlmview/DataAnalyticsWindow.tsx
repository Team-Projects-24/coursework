/**
 *
 * @author Olivia Gray, Euan Hall (Individual view)
 *
 * @description puts all tlm components together to create the view for team leaders and managers
 *
 */

import { use, useEffect, useState } from "react";
import GraphContainer from "./graph/GraphContainer";
import TeamUserList from "./teamuserlists/TeamUserList";
import TimeFrameContainer from "./timeframe/TimeFrameContainer";
import useUserStore from "stores/userStore";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { BarCard } from "components/dashboard/BarCard";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import { getLinearProgressUtilityClass } from "@mui/material";
import { ITeam } from "types/analysis/Team.d";
import { IEmployee } from "types/analysis/Employee.d";
import { time } from "console";

function DataAnalyticsWindow() {
  const [teams, setTeams] = useState();
  const [members, setMembers] = useState<any>();
  const [teamUserState, setTeamUserState] = useState(-1);
  const [selectedTeams, setSelectedTeams] = useState<boolean[] | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<boolean[][] | null>(null);
  const [selectedTeamIDs, setSelectedTeamIDs] = useState<number[]>([]);
  const [selectedUserIDs, setSelectedUserIDs] = useState<String[]>([]);
  const [timeFrameState, setTimeFrameState] = useState(false);
  const [graphState, setGraphState] = useState(-1);
  const [performanceData, setPerformanceData] = useState<any | null>(null);
  

  // Get the currently logged in user
  // DYNAMICALLY LOADING THE PAGE
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Change graph state when selectedUsers or selectedTeams or timeFrameToggle changes
    //determineGraphState();
  });

  async function loadData() {
    axios
      .post("api/analysis/getTeamIDs", {
        leaderID: "Olivia",
      })
      .then((responseIDs) => {
        axios
          .post("api/analysis/getTeams", {
            teamID: responseIDs.data,
          })
          .then((responseTeams) => {
            //console.log(responseTeams.data);
            setTeams(responseTeams.data);
            axios
              .post("api/analysis/getTeamMembers", {
                teamID: responseIDs.data,
              })
              .then((responseMembers) => {
                //console.log(responseMembers.data);
                setMembers(responseMembers.data);
              });
          });
      });
  }

  async function loadPerformanceData(
    teamInputs: number[],
    userInputs: String[],
    timeFrame: boolean
  ) {
    console.log("getting performance data");
    console.log(teamInputs);
    console.log(userInputs);
    console.log(timeFrameState);
    if (teamInputs.length === 1 && !timeFrame) {
      // Get a single team's performance
      console.log("single team");
      setGraphState(0);
      axios
        .post("api/analysis/getTeamPerformanceMetrics", {
          teamIDs: teamInputs,
        })
        .then((response) => {
          console.log(response.data);
          setPerformanceData(response.data);
        });
    } else if (userInputs.length === 1 && !timeFrame) {
      console.log("single user");
      setGraphState(0);
      // Get a single employee's performance
      //let requestedUsers = getSelectedUserIDs();
      //console.log(requestedUsers);
      axios
        .post("api/analysis/getUserPerformanceMetrics", {
          userIDs: userInputs,
        })
        .then((response) => {
          //console.log(response.data);
          setPerformanceData(response.data);
        });
    } else if (teamInputs.length > 0 && !timeFrame) {
      console.log("multiple teams");
      setGraphState(1);
      // Compare teams in a bar chart
      axios
        .post("api/analysis/getTeamPerformanceMetrics", {
          teamIDs: teamInputs,
        })
        .then((response) => {
          //console.log(response.data);
          setPerformanceData(response.data);
        });
    } else if (userInputs.length > 0 && !timeFrame) {
      console.log("multiple users");
      setGraphState(1);
      // Compare users in a bar chart
      axios
        .post("api/analysis/getUserPerformanceMetrics", {
          userIDs: userInputs,
        })
        .then((response) => {
          //console.log(response.data);
          setPerformanceData(response.data);
        });
    } else if (teamInputs.length > 0 && timeFrame) {
      console.log("line graph for teams");
      setGraphState(2);
      // View / display performance over a time period for teams
      axios
        .post("api/analysis/getTeamTimePerformanceMetrics", {
          teamIDs: teamInputs,
        })
        .then((response) => {
          console.log(response.data);
          setPerformanceData(response.data);
        });
    } else if (userInputs.length > 0 && timeFrame) {
      console.log("line graph for users");
      setGraphState(2);
      // View / display performance over a time period for users
      axios
        .post("api/analysis/getUserTimePerformanceMetrics", {
          userIDs: userInputs,
        })
        .then((response) => {
          console.log(response.data);
          setPerformanceData(response.data);
        });
    } else {
      // Nothing selected
      console.log("nothing selected");
      setGraphState(-1);
    }
  }

  // handler events
  const handleTeamUser = (newState: number) => {
    setTeamUserState(newState);
  };

  const handleRecievedTeamUser = (
    selectedTeams: boolean[],
    selectedUsers: boolean[][]
  ) => {
    setSelectedUsers(selectedUsers);
    setSelectedTeams(selectedTeams);

    //console.log(selectedUsers);

    if (selectedTeams.includes(true)) {
      let teamsInput: any[] = [];
      // Determine the corresponding teams from selectedTeams
      console.log(selectedTeams);
      for (let i = 0; i < selectedTeams.length; i++) {
        // If selectedTeams[i] is true then we want to get the performance data of this team
        if (selectedTeams[i]) {
          //console.log(teams?.[i]);
          teamsInput.push(teams?.[i]["teamID"]);
        }
      }
      console.log(teamsInput);
      setSelectedTeamIDs(teamsInput);
      setSelectedUserIDs([]);
      loadPerformanceData(teamsInput, [], timeFrameState);
    } else {
      let usersInput: any[] = [];
      // Determine the corresponding users from selectedUsers
      for (let i = 0; i < selectedUsers.length; i++) {
        for (let j = 0; j < selectedUsers[i].length; j++) {
          if (selectedUsers[i][j]) {
            usersInput.push(members?.[i]?.[j]["userID"]);
          }
        }
      }
      if (usersInput.length > 0) {
        console.log(usersInput);
        setSelectedTeamIDs([]);
        setSelectedUserIDs(usersInput);
        loadPerformanceData([], usersInput, timeFrameState);
      }
    }
  };

  const handleTimeFrameToggle = (newState: boolean) => {
    setTimeFrameState(newState);
    loadPerformanceData(selectedTeamIDs, selectedUserIDs, newState);
  };

  // Figure out what kind of graph should be displayed
  const determineGraphState = () => {
    //console.log("graphing");
    if (teamUserState === 0 && timeFrameState === true) {
      // Display single line graph (2)
      setGraphState(2);
    } else if (teamUserState === 0) {
      // Display progress bar (0)
      setGraphState(0);
    } else if (teamUserState === 1 && timeFrameState === true) {
      // Display multi-line line graph (2)
      setGraphState(2);
    } else if (teamUserState === 1) {
      // Display bar chart (1)
      setGraphState(1);
    } else {
      // Display no graph (-1)
      setGraphState(-1);
    }
  };

  return (<div className="tlm container text-center">
		      <div className="row">
			<div className="col">
			  <TeamUserList
			    teams={teams ? teams : []}
			    users={members ? members : []}
			    onSelectTeamUser={handleTeamUser}
			    onSendTeamUser={handleRecievedTeamUser}
			  />
			</div>
			<div className="col">
			  <GraphContainer graphState={graphState} data={performanceData} />
			  <TimeFrameContainer onToggleTimeFrame={handleTimeFrameToggle} />
			</div>
		      </div>
		</div>
  );
}

function IndividualUserView() {
   const { user } = useUserStore();
   const [performanceData, setPerformanceData] = useState<any | null>(null);
   const pieChartData = [
     {
       id: "To-do",
       label: "To-do",
       value: 20,
       color: "hsl(339, 70%, 50%)",
     },
     {
       id: "in-Progress",
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
      axios
        .post("api/analysis/getUserPerformanceMetrics", {
          userIDs: user.userId,
        })
        .then((response) => {
        	console.log(response.data);
          setPerformanceData(response.data);
        }); 
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
        			<BarCard title={"Task"} total={data.manHoursSet} completed={data.manHoursCompleted} totalLabel={"Total"} isHours={true} />
        		</Box>
      	    	))}
	  </div> 
        </div>
        <Card elevation={2} className=" p-2 w-1/2 h-1/2 text-center mobile-only:w-[100%]" sx={{ m: 2, height: 300, overflow: "auto" }}>
		<CardContent sx={{ height: 420, width: "100%", overflowX: "hidden", scrollBehavior: "auto",}}>
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

export default function AnalyticPage() {
   const { user } = useUserStore(); 
   
   
   const userView = () => {
   	let e = document.getElementById('UserView');
   	e.style.display = 'flex';
   	
   	e = document.getElementById('TeamView');
   	if(e != null) {e.style.display = 'none'; }
   	
   	e = document.getElementById('ManagerView');
   	if(e != null) {e.style.display = 'none'; }
   }
   
   const teamView = () => {
	let e = document.getElementById('UserView');
   	if(e != null) {e.style.display = 'none';}
   	
   	e = document.getElementById('TeamView');
   	if(e != null) {e.style.display = 'flex w-full';}
   	
   	e = document.getElementById('ManagerView');
   	if(e != null) {e.style.display = 'none';}
   }
   
   const managerView = () => {
	let e = document.getElementById('UserView');
   	if(e != null) {e.style.display = 'none';}
   	
   	e = document.getElementById('TeamView');
   	if(e != null) {e.style.display = 'none';}
   	
   	e = document.getElementById('ManagerView');
   	if(e != null) {e.style.display = 'flex';}
   }
   
  return (
  	<div className="flex h-[calc(100vh-4rem)]">
	  	<div className="mobile-only:absolute h-full">
		  	<div id="data-left-nav" className="movbile-only:hidden relative h-full bg-dark-light text-white flex flex-col w.44 p-2">
		  		<div className="mobile-only:hidden flex rounded-r-lg items-center false"><a className="px-4 py-2" href="#" onClick={userView}>{user?.name}'s Progress</a></div>
		  		<div className="mobile-only:hidden flex rounded-r-lg items-center false"><a className="px-4 py-2" href="#" onClick={teamView}>Team</a></div>
		  		<div className="mobile-only:hidden flex rounded-r-lg items-center false"><a className="px-4 py-2" href="#" onClick={managerView}>Manager</a></div>
		  	</div>
		</div>
		
		    <IndividualUserView />
		    <div id="ManagerView" className="none">
		    	<DataAnalyticsWindow />
		    </div>
	</div>
  );
}
